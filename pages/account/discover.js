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
  IconButton,
  useBreakpointValue as bp
} from '@chakra-ui/react';
import withAuth from '../../components/withAuth';
import supabase from '../../lib/supabaseClient';
import { useEffect, useCallback, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import MovieCard from '../../components/cards/MovieCard';
import Link from 'next/link';

const Discover = ({ movies }) => {
  const user = supabase.auth.user();
  const [medias, setMedias] = useState([]);
  const [preferences, setPreferences] = useState({ genres: [] });

  const [isEmpty, setIsEmpty] = useState(false);
  const mt = bp({ base: '4rem' });
  const fs = bp({ base: 'md', lg: 'md1' });

  const getPreferences = useCallback(async () => {
    try {
      const { data } = await supabase.from('preferences').select('*').eq('user_id', user.id);
      return data.length ? JSON.parse(data[0].value) : 0;
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
        let matches = movies.filter((media) => checkPreference(media, preferences));
        if (matches.length === 0) {
          setIsEmpty(true);
        } else {
          setMedias(matches);
        }
      } else {
        setIsEmpty(true);
      }
    });
    return () => {};
  }, []);

  return (
    <Container maxW={bp({ base: '96vw', lg: '90vw' })} my="8">
      <Link href="/">
        <IconButton
          colorScheme="primary"
          mb="4"
          d={bp({ base: 'none', lg: 'flex' })}
          fontSize="20px"
          aria-label="Back to homepage"
          icon={<AiFillHome />}
        />
      </Link>
      <Text fontSize={bp({ base: 'md1', lg: 'md2' })} fontWeight="bold">
        Discover shows based on your preferences
      </Text>
      {preferences.network === 'NETFLIX' && (
        <Image
          w="40px"
          h="40px"
          boxShadow="0 0.5rem 1rem rgba(0,0,0,.15)"
          borderRadius="10px"
          src="data:image/jpeg;base64,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"
        />
      )}
      {preferences.network === 'AMAZON PRIME VIDEO' && (
        <Image
          w="40px"
          h="40px"
          boxShadow="0 0.5rem 1rem rgba(0,0,0,.15)"
          borderRadius="10px"
          src="data:image/jpeg;base64,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"
        />
      )}
      {preferences.network === 'ANY' && (
        <HStack spacing="1rem">
          <Image
            w="40px"
            h="40px"
            boxShadow="0 0.5rem 1rem rgba(0,0,0,.15)"
            borderRadius="10px"
            src="data:image/jpeg;base64,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"
          />
          <Image
            w="40px"
            h="40px"
            boxShadow="0 0.5rem 1rem rgba(0,0,0,.15)"
            borderRadius="10px"
            src="data:image/jpeg;base64,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"
          />
        </HStack>
      )}
      <HStack spacing="1rem" mt="1rem" h="30px" flexWrap="wrap">
        {preferences.genres.map((genre) => {
          return (
            <Badge variant="outline" colorScheme="primary" p=".3rem" mb="1rem">
              {genre.name}
            </Badge>
          );
        })}
      </HStack>
      <SimpleGrid columns={bp({ base: 2, lg: 4 })} spacing="40px" mt="7">
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
        <VStack justifyContent="center" mt={mt}>
          <Box as={FaRegSadCry} boxSize="70px" />
          <Text textAlign="center" fontSize={fs}>
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

export async function getStaticProps(context) {
  const supabase = require('@supabase/supabase-js');
  const client = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  let { data: movies, error } = await client.from('movies').select('*');
  return {
    props: { movies }
  };
}
