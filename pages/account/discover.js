import {
  Box,
  Container,
  SimpleGrid,
  Text,
  Badge,
  HStack,
  Skeleton,
  Flex,
  VStack
} from '@chakra-ui/react';
import withAuth from '../../components/withAuth';
import supabase from '../../lib/supabaseClient';
import { useEffect, useCallback, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import MovieCard from '../../components/cards/MovieCard';

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
        if (genre.id == item.id && media.provider === preferences.network) {
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
    <Container maxW="90vw" mt="8">
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
      </HStack>
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
