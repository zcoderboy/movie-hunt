import {
  Button,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  Box,
  VStack,
  SimpleGrid,
  Flex,
  Skeleton
} from '@chakra-ui/react';
import supabase from '../lib/supabaseClient';
import MovieCard from './cards/MovieCard';
import { useState, useCallback, useEffect } from 'react';
import { TiArrowRight } from 'react-icons/ti';
import Link from 'next/link';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTrending = useCallback(async () => {
    let { data: trending, error } = await supabase.from('trending').select('*').range(0, 3);
    setTrending(trending);
  }, []);

  async function loadTrendingByNetwork(network) {
    setIsLoading(true);
    network = network == 1 ? 'NETFLIX' : 'AMAZON PRIME VIDEO';
    let { data: trending, error } = await supabase
      .from('trending')
      .select('*')
      .eq('provider', network)
      .range(0, 3);

    setTrending(trending);
    setIsLoading(false);
  }

  useEffect(() => {
    getTrending().then(() => {
      setIsLoading(false);
    });
    return () => {};
  }, []);
  return (
    <VStack spacing="3rem" align="left">
      <Box>
        <HStack align="left">
          <Heading fontSize="lg" as="h1">
            What's hot ?
          </Heading>
          <Button
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
        </HStack>
        <SimpleGrid columns={4} spacingX="40px" mt="4">
          {!isLoading &&
            trending.map((media) => {
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
          {isLoading &&
            [...new Array(4)].map(() => {
              return <Skeleton h="350px" borderRadius="4px"></Skeleton>;
            })}
        </SimpleGrid>
        <Flex justify="flex-end" mt="4">
          <Link href="/trending">
            <Box d="flex" alignItems="center">
              <Text cursor="pointer" color="primary.500" fontSize="md1">
                Discover all trending shows
              </Text>
              <Box color="primary.500" as={TiArrowRight} boxSize="30px" />
            </Box>
          </Link>
        </Flex>
      </Box>
    </VStack>
  );
};

export default Trending;
