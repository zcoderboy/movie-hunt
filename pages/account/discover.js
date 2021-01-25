import { Box, Container, SimpleGrid, Text, Badge, HStack, Skeleton } from '@chakra-ui/react';
import withAuth from '../../components/withAuth';
import supabase from '../../lib/supabaseClient';
import { useEffect, useCallback, useState } from 'react';
import MovieCard from '../../components/cards/MovieCard';

const Discover = () => {
  const user = supabase.auth.user();
  const [medias, setMedias] = useState([]);
  const [preferences, setPreferences] = useState({ genres: [] });
  const getPreferences = useCallback(async () => {
    try {
      const { data } = await supabase.from('preferences').select('*').eq('user_id', user.id);
      return JSON.parse(data[0].value);
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

  const checkPreference = (media, preferences) => {
    let match = false;
    media.genres.forEach((genre, index) => {
      preferences.genres.forEach((item) => {
        if (genre.id == item.id) {
          match = true;
        }
      });
    });

    return match;
  };

  useEffect(() => {
    getPreferences().then((preferences) => {
      setPreferences(preferences);
      getMedias().then((medias) => {
        let matches = medias.filter((media) => checkPreference(media.data, preferences));
        setMedias(matches);
      });
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
          [...new Array(4)].map(() => {
            return <Skeleton h="350px" borderRadius="4px"></Skeleton>;
          })}
      </SimpleGrid>
    </Container>
  );
};

export default withAuth(Discover);
