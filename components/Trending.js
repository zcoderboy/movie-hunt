import { Button, Heading, HStack, Input, Select, Box, VStack, SimpleGrid } from '@chakra-ui/react';
import supabase from '../lib/supabaseClient';
import MovieCard from './cards/MovieCard';
import { useState, useCallback, useEffect } from 'react';

const Trending = () => {
  const [trending, setTrending] = useState([]);

  const getTrending = useCallback(async () => {
    let { data: trending, error } = await supabase.from('trending').select('*').range(0, 3);
    setTrending(trending);
  }, []);

  async function loadTrendingByNetwork(network) {
    network = network == 1 ? 'NETFLIX' : 'AMAZON PRIME VIDEO';
    let { data: trending, error } = await supabase
      .from('trending')
      .select('*')
      .eq('provider', network)
      .range(0, 3);

    setTrending(trending);
  }

  useEffect(() => {
    getTrending();
    return () => {};
  }, []);
  return (
    <VStack spacing="3rem" align="left">
      <Box>
        <Heading fontSize="lg" as="h1">
          What are you looking for ?
        </Heading>
        <HStack mt="4">
          <Select placeholder="" focusBorderColor="#F97B2F" placeholder="" h="3rem">
            <option>Adventure</option>
          </Select>
          <Input focusBorderColor="#F97B2F" placeholder="Year" h="3rem" />
          <Select focusBorderColor="#F97B2F" placeholder="" h="3rem">
            <option selected>Netflix</option>
            <option>Amazon Prime Video</option>
          </Select>
          <Button colorScheme="primary" p="1rem 4rem" h="3rem">
            Find
          </Button>
        </HStack>
      </Box>
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
          {trending.map((media) => {
            return <MovieCard poster={media.data.poster_path} />;
          })}
        </SimpleGrid>
      </Box>
    </VStack>
  );
};

export default Trending;
