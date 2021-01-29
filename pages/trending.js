import {
  Container,
  Text,
  SimpleGrid,
  Skeleton,
  HStack,
  Button,
  Box,
  IconButton
} from '@chakra-ui/react';
import { useEffect, useCallback, useState } from 'react';
import supabase from '../lib/supabaseClient';
import MovieCard from '../components/cards/MovieCard';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';

const TrendingMovies = () => {
  const [trends, setTrends] = useState([]);
  const getTrending = useCallback(async () => {
    try {
      const { data } = await supabase.from('trending').select('*');
      return data;
    } catch (error) {
      alert(error);
    }
  }, []);
  async function loadTrendingByNetwork(network) {
    setTrends([]);
    network = network == 1 ? 'NETFLIX' : 'AMAZON PRIME VIDEO';
    let { data: trending, error } = await supabase
      .from('trending')
      .select('*')
      .eq('provider', network);
    setTrends(trending);
  }

  useEffect(() => {
    getTrending().then((trends) => {
      setTrends(trends);
    });
  }, []);
  return (
    <Container maxW="90vw" mt="8">
      <Link href="/">
        <IconButton
          colorScheme="primary"
          mb="4"
          fontSize="20px"
          aria-label="Back to homepage"
          icon={<AiFillHome />}
        />
      </Link>
      <HStack align="left" spacing="2rem">
        <Text fontSize="md2" fontWeight="bold">
          Trending shows 🔥
        </Text>
        <Box>
          <Button
            mr="2"
            bg="#fff"
            border="1px solid #DE0913"
            color="#DE0913"
            _hover={{
              backgroundColor: '#DE0913',
              color: '#fff'
            }}
            _focus={{
              backgroundColor: '#DE0913',
              color: '#fff'
            }}
            onClick={() => loadTrendingByNetwork(1)}>
            Netflix
          </Button>
          <Button
            bg="#fff"
            border="1px solid #1CAFDF"
            color="#1CAFDF"
            _hover={{
              backgroundColor: '#1CAFDF',
              color: '#fff'
            }}
            _focus={{
              backgroundColor: '#1CAFDF',
              color: '#fff'
            }}
            onClick={() => loadTrendingByNetwork(2)}>
            Prime Video
          </Button>
        </Box>
      </HStack>
      <SimpleGrid columns={4} spacing="40px" mt="7">
        {trends.length !== 0 &&
          trends.map((media) => {
            return (
              <MovieCard
                poster={media.data.poster_path}
                title={media.data.title ? media.data.title : media.data.name}
                description={media.data.overview}
                releaseDate={
                  media.data.release_date ? media.data.release_date : media.data.first_air_date
                }
                extra={media}
              />
            );
          })}
        {trends.length === 0 &&
          [...new Array(4)].map(() => {
            return <Skeleton h="350px" borderRadius="4px"></Skeleton>;
          })}
      </SimpleGrid>
    </Container>
  );
};

export default TrendingMovies;
