import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Badge,
  HStack,
  Skeleton,
  Flex,
  Button,
  Image,
  VStack,
  IconButton
} from '@chakra-ui/react';
import withAuth from '../../components/withAuth';
import supabase from '../../lib/supabaseClient';
import { useEffect, useCallback, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import MovieCard from '../../components/cards/MovieCard';
import Link from 'next/link';

const Discover = () => {
  const user = supabase.auth.user();
  const [medias, setMedias] = useState([]);
  const [preferences, setPreferences] = useState({ genres: [] });
  const [isEmpty, setIsEmpty] = useState(false);

  const getPreferences = useCallback(async () => {
    try {
      const { data } = await supabase.from('preferences').select('*').eq('user_id', user.id);
      return data ? JSON.parse(data[0].value) : data;
    } catch (error) {
      alert(error);
    }
  }, []);

  const getMedias = useCallback(async () => {
    try {
      const { data } = await supabase.from('movies').select('*');
      return data;
    } catch (error) {
      alert(error);
    }
  }, []);

  const isBetween = (value, min, max) => {
    if (value >= min && value <= max) {
      return true;
    }
    return false;
  };

  const checkPreference = (media, preferences) => {
    let match = false;
    const { rateMin, yearMin } = preferences;
    media.data.genres.forEach((genre, index) => {
      preferences.genres.forEach((item) => {
        if (
          genre.id == item.id &&
          (media.provider === preferences.network || preferences.network === 'ANY')
        ) {
          if (rateMin && yearMin) {
            if (
              isBetween(media.data.vote_average, rateMin, 10) &&
              isBetween(media.data.release_date.split('-')[0], yearMin, 2021)
            ) {
              match = true;
            }
          } else if (rateMin && yearMin === '') {
            if (
              isBetween(media.data.vote_average, rateMin, 10) &&
              isBetween(media.data.release_date.split('-')[0], 2000, 2021)
            )
              match = true;
          } else if (rateMin === '' && yearMin) {
            if (
              isBetween(media.data.release_date.split('-')[0], yearMin, 2021) &&
              isBetween(media.data.vote_average, 1, 10)
            )
              match = true;
          }
        }
      });
    });

    return match;
  };

  useEffect(() => {
    getPreferences().then((preferences) => {
      if (preferences) {
        setPreferences(preferences);
        getMedias().then((medias) => {
          let matches = medias.filter((media) => checkPreference(media, preferences));
          if (matches.length === 0) {
            setIsEmpty(true);
          } else {
            setMedias(matches);
          }
        });
      }
    });
    return () => {};
  }, []);

  return (
    <Container maxW="90vw" my="8">
      <Link href="/">
        <IconButton
          colorScheme="primary"
          mb="4"
          fontSize="20px"
          aria-label="Back to homepage"
          icon={<AiFillHome />}
        />
      </Link>
      <Text fontSize="md2" fontWeight="bold">
        Discover shows based on your preferences
      </Text>
      <HStack spacing="1rem" mt="1rem" h="30px">
        {preferences.genres.map((genre) => {
          return (
            <Badge variant="outline" colorScheme="primary" p=".3rem">
              {genre.name}
            </Badge>
          );
        })}
        {preferences.network === 'NETFLIX' && (
          <Image
            w="40px"
            h="40px"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEL0lEQVR4Ab3YA5DsWgKA4e+cJOOZvfbatm3btm17C2vbfrZt27aNcXdyXld18am7k7n3q2pGf1UcDT0Ub8f38Fdsr/v6O36Ad+GRGggG93C8Ga/R/8LPwi7YGidsrsAn4xt4hWb2x/dwyFIFFvgRPmNp/Qlfws1NAh+BHfEAm8dVeB2OrBP4Euxpy3grthok8EXY25b1RmwHABDd0f16xX1teeGfa4f8avWQ33Zef10zZH0WAMA7JwrfWjbkM1NDvtL5/HjncyQEd2NbPL5XYNbP3vWm8dy7OmGf7IR+bEXhfZ3YN0xkAODVY7lOlPdMFj40OeQdneAhPR2I8bsL/BU26uGY+aSar1zTqly1WLFQedV4BgCuLJML2pVLOq+LOq/LOq9KT5P4x10FPhQf04cb21zTZjTS/Z08dyzzoCLS3BvwDO4Y+Ht9qnBFiwiYS2R58I7JzBL5I0AE3BvP1qeJyHVtbinJAxHK5KVjSxb4MDwGIuAD9G80MlNxdXc1gxvayWNHogcWAQSNfRQi4O30LyDgkhYxkTCvu5rfOZmDMjWOfBNCxP1xX/pXYlnOVS2ubTMciGi1K6+fyMC1ZRI0sgxPjniaAaXEWHc1u3CR8QjcUPKwkehpnde5i0mFoJGnRjxUDSExGrmsRQWoIPDq8dytJa1E1Mh9IjYYUEKFVVl3FV/dYiQQMNtOXjoePaiIrmwnMWhiZcSUGipMZExXnLfQ/Z5wU8UjhoPHjgQXLRI1MhbVlBAwGblgkTIRENBK3G+YhUSJoL6IW9VUYWMRnNMpOW0+WZYRcGvF/Ya4R8bNJVFS01zElWpKiRU5l5fJPrOVkSyosJhYlbM255o2WVDXDRFnq6lCTicm2Gm61CqTYQRUuNcQrURS28URR6gpAR40xDGLpYNnKyvyAKbL7mpelnFrGQS1HB1xNi7TwPIIbDXdFrIgoaUbt7HgppLMwKZxRAT8X00JWQB2nim128loIKCVWJ+TkAxsB5QR8BcNRERcV3L4XGlZHiTMJdYXTEVmKoKB/B4i4Bwcp6YkGArA1reWhCChnZjMWFcwXRGDfl2EoyAC4EMaCWDb6dIti5WpQMBiYkORFIGU9OtDABEAJ+LfdbIiAK6rkt1mSxNFBPMVq/NgZcZM0o+9se8dA4EP4yY9rMuC++XRvfNgU+e1MgYBALvOlOTBuiJYW0TFcPTk0aDUU4m3A0AOAJjDc3GiuxCw31zpiPnSBe3KdOLasrKQEoAdpktvvGjOaAyWRR5QRDlGA3PJ3XkRru/n0cebsPVdBSa91Zj2Q/gzAECAXpFbwIfxJxgkEJ6GnbDa5jGLN2BPqBMIK/EzvMvS2h6fxaXQJBDgpfgGnqaZE/F97KgPweCehnfgVdioP1djd/wXB9hCIp6OT+Kn+Ce2xw74F36Oz+DZKNR0G9LyYOtXWmbtAAAAAElFTkSuQmCC"
          />
        )}
        {preferences.network === 'AMAZON PRIME VIDEO' && (
          <Image
            w="40px"
            h="40px"
            src="data:image/png;base64,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"
          />
        )}
        {preferences.network === 'ANY' && (
          <HStack spacing="1rem">
            <Image
              w="40px"
              h="40px"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEL0lEQVR4Ab3YA5DsWgKA4e+cJOOZvfbatm3btm17C2vbfrZt27aNcXdyXld18am7k7n3q2pGf1UcDT0Ub8f38Fdsr/v6O36Ad+GRGggG93C8Ga/R/8LPwi7YGidsrsAn4xt4hWb2x/dwyFIFFvgRPmNp/Qlfws1NAh+BHfEAm8dVeB2OrBP4Euxpy3grthok8EXY25b1RmwHABDd0f16xX1teeGfa4f8avWQ33Zef10zZH0WAMA7JwrfWjbkM1NDvtL5/HjncyQEd2NbPL5XYNbP3vWm8dy7OmGf7IR+bEXhfZ3YN0xkAODVY7lOlPdMFj40OeQdneAhPR2I8bsL/BU26uGY+aSar1zTqly1WLFQedV4BgCuLJML2pVLOq+LOq/LOq9KT5P4x10FPhQf04cb21zTZjTS/Z08dyzzoCLS3BvwDO4Y+Ht9qnBFiwiYS2R58I7JzBL5I0AE3BvP1qeJyHVtbinJAxHK5KVjSxb4MDwGIuAD9G80MlNxdXc1gxvayWNHogcWAQSNfRQi4O30LyDgkhYxkTCvu5rfOZmDMjWOfBNCxP1xX/pXYlnOVS2ubTMciGi1K6+fyMC1ZRI0sgxPjniaAaXEWHc1u3CR8QjcUPKwkehpnde5i0mFoJGnRjxUDSExGrmsRQWoIPDq8dytJa1E1Mh9IjYYUEKFVVl3FV/dYiQQMNtOXjoePaiIrmwnMWhiZcSUGipMZExXnLfQ/Z5wU8UjhoPHjgQXLRI1MhbVlBAwGblgkTIRENBK3G+YhUSJoL6IW9VUYWMRnNMpOW0+WZYRcGvF/Ya4R8bNJVFS01zElWpKiRU5l5fJPrOVkSyosJhYlbM255o2WVDXDRFnq6lCTicm2Gm61CqTYQRUuNcQrURS28URR6gpAR40xDGLpYNnKyvyAKbL7mpelnFrGQS1HB1xNi7TwPIIbDXdFrIgoaUbt7HgppLMwKZxRAT8X00JWQB2nim128loIKCVWJ+TkAxsB5QR8BcNRERcV3L4XGlZHiTMJdYXTEVmKoKB/B4i4Bwcp6YkGArA1reWhCChnZjMWFcwXRGDfl2EoyAC4EMaCWDb6dIti5WpQMBiYkORFIGU9OtDABEAJ+LfdbIiAK6rkt1mSxNFBPMVq/NgZcZM0o+9se8dA4EP4yY9rMuC++XRvfNgU+e1MgYBALvOlOTBuiJYW0TFcPTk0aDUU4m3A0AOAJjDc3GiuxCw31zpiPnSBe3KdOLasrKQEoAdpktvvGjOaAyWRR5QRDlGA3PJ3XkRru/n0cebsPVdBSa91Zj2Q/gzAECAXpFbwIfxJxgkEJ6GnbDa5jGLN2BPqBMIK/EzvMvS2h6fxaXQJBDgpfgGnqaZE/F97KgPweCehnfgVdioP1djd/wXB9hCIp6OT+Kn+Ce2xw74F36Oz+DZKNR0G9LyYOtXWmbtAAAAAElFTkSuQmCC"
            />
            <Image
              w="40px"
              h="40px"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAABnRSTlMAAAAAAABupgeRAAAGEklEQVR4Ab2WA5AdWxCGJ7Zt27Zt27aT3di217bNSm68tm3FqlfG+1InuDVrnuqaq6n7TXf/f58jFXtZZIioY51V2T69lkNmE6fs5s45UnktjYg6OrEtDBIk87TcbMDEILesZh5ZZcS76VXlrm+Th4GA/7I7GCfnyW7r+gEw0fbZ+86KjyWH1r2okK6++sd+Glowm5qXll1fxVE66SKd9Sw9uzj4/ZbSYdsyYUMtKrvaDiNpj1nB7PZPw8qavV5T2qxbMBvwRtOIZQaRZcpeo1Yoe8wj//CEjx4hOUXJG6kLdoHgJfek5Y+qrv7FbrdTf4yKJbHulsvo806wh170HHvj1dg7L6Y+8rpoHbbTOALwGL0oYrFl4iyL1DFWqWudMifYZsLuZZO21O39ZsUHnA27QJ3PvlZp/q2/7P23rOPTPkQmZCanZ0UnZ6uqKYw8Q3lD2HklkTHX644xqTnfg1M/cxVvMj/9x3W+Y7pt6Of4D7++9E/5Mc09p0D2jEvKbNXbdjmfvz00fn3gvlta9odXfjG2nkG8UXMI2q/tzTO5+CYA/vT95z33ZN03mSBvKzKof1zGD3WvLD7qBnwieEPeMo8pUcedlCadVWYLsMoj5+GHTcjSPzIdMAWYduM5NRfgWw5hgA9bhIvUd9klmvtlAebK9+RKuEV/7m+fSb/zYY9WkbFVrpkAtnDxVTN9QaIuryIFeMlVV1ouwPesg75/+Qc+ZPMbTMZ8BPnE+/PF158A59b5b269YfsqjT6kzBZgv9C4oKik514Rq85ZPjJ5A37KGYc+p50VfknarhGq+l7BsdmbdAJOmocrwjPx2GPPeKpN6hSfZnvFfaLZgJGbMhvF/Rkag3bBVs4b8JePX+9oOc8/ojtshzYGG7DLiLILj5E0eILKN73yqtNNbzyGvweoBSJyPIbB0DkiR+p57mMSq0avTVL/bTL2xmNqb/3DN6jqCa3h7147taYctcBmf/1NswEXY67J2IBzs1tOOzNs5bVWC64LrbVY9eCJ8TPKjtyYLQRsDEapJ131KNlMFeA82JWnnf6rtUbL7x64bGpg82quqhllJ+8e+01pedaHz4BbnHCFTc3lbM1ISScxP7YEUsaWhh1ase3a87cBp24aNpl7mU47PfPj6voyCJURXsFJZI/NAM+94onUkRvZM1WG3vVitPEG5SMuhJZf3gIsZ09Yej4+JZ02j197NSYhGQzpMsXAI3Xe4DQBZqbyHDjN/V0sMNSOwvlesImJhrGknpstBws2BbdxfQvgzGVdfAxPw8Sdj+DhUYAeW7QpAACmKf/OhAHMT4DFx263fXEXkwR/59nvPMBE3T5bN+25wf+SdEpi2uI9D/6CKQBIPIa/uQG5QQJJy2+Z+217pBBgaq6tiBOjTaa1gsBEt9G7AsN+ycfN9WXXGad0TJ0p/uVHVvSeJyBp6s+vm6468ASU2twthAAsau7hk8aV7QSLi3OL/JzKyo+95/AtqPPWX6kzXuXIGW0TM1dSn7PzEV0ATPZ0esQuHeTGQIXHVcxUnIbcaPOSp355npmAFgRu0G8bedNvAjZ5S1NOYLOuCy/3WXYDj7Vd+/jv/o3BCDFbOqnYYDMx14jc7HzBQyfvX7HpXPOhO0S/ZXNNtofKzi1QabbDyzg2ErTW78ZLZX8DJgoCW1u52LkqBB6dS4P2FpHNFq5v50O12cXZprar+8rmGgE0X/bMZaqw0fALhQ/N7jfxIODc+xhs2ZmJlqMyzH1J/zX6WnxPIZupkvLKT9i37+ogZnYqTEUBLlzRYKgxXgbPO9Nx3nnR7KHrHs7YpclMZZ7DQ+rwoN4yfoWv2MRk51RJtvIztEg9My0bUxLs09iJSkRFpojgyYBxKCCYNkidkU7qOJvxIj+nypecLcdPnnOE7H3e+ZE6BSDEc/AGqpivDLjxuzWoee21GoCxeL19RspnZBBFBMsDoY2dvg/FHT7xkGlK7DunvXLfPbGHSguuKPc79/kcRInZ8j1UaA1/59aanC1WGbLxWOFsscqWzf4tY8v9XdxVBmz5qhC2VPpVLK2xnUjlsfJlF3P9D6NzFIEpWTFCAAAAAElFTkSuQmCC"
            />
          </HStack>
        )}
      </HStack>
      <HStack spacing="1rem" mt="1rem" h="30px"></HStack>
      <SimpleGrid columns={4} spacing="40px" mt="7">
        {medias.length !== 0 &&
          medias.map((media) => {
            return (
              <MovieCard
                poster={media.data.poster_path}
                title={media.data.title}
                description={media.data.overview}
                releaseDate={media.data.release_date}
                extra={media}
              />
            );
          })}
        {medias.length === 0 &&
          !isEmpty &&
          [...new Array(4)].map(() => {
            return <Skeleton h="350px" borderRadius="4px"></Skeleton>;
          })}
      </SimpleGrid>
      {isEmpty && (
        <VStack justifyContent="center">
          <Box as={FaRegSadCry} boxSize="70px" />
          <Text textAlign="center" fontSize="md1">
            Ooops, we couldn't find any matching shows.
            <br />
            Try adjusting your preferences.
          </Text>
        </VStack>
      )}
    </Container>
  );
};

export default withAuth(Discover);
