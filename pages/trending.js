import {
  Container,
  Text,
  SimpleGrid,
  Skeleton,
  HStack,
  Button,
  Box,
  IconButton,
  useBreakpointValue as bp
} from '@chakra-ui/react';
import { useEffect, useCallback, useState } from 'react';
import MovieCard from '../components/cards/MovieCard';
import Link from 'next/link';
import { AiFillHome } from 'react-icons/ai';
import Head from 'next/head';

const TrendingMovies = ({ trending }) => {
  const [trends, setTrends] = useState(trending);

  async function loadTrendingByNetwork(network) {
    setTrends([]);
    let response = await fetch('/api/trends', {
      method: 'POST',
      body: JSON.stringify({ network: network })
    });
    if (response.ok) {
      setTrends(await response.json());
    }
  }

  useEffect(() => {}, []);
  return (
    <Container maxW={bp({ base: '96vw', lg: '90vw' })} my="8">
      <Head>
        <title>Movie Hunt - Trending movies and shows</title>
      </Head>
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
      <HStack align="left" spacing="2rem" flexDir={bp({ base: 'column', lg: 'row' })}>
        <Text fontSize="md2" fontWeight="bold" mb={bp({ base: '.8rem', lg: '0rem' })}>
          Trending shows 🔥
        </Text>
        <Box ml={bp({ base: '0rem !important', lg: 'auto' })}>
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
      <SimpleGrid
        columns={bp({ base: 2, lg: 4 })}
        spacing={bp({ base: '20px', lg: '40px' })}
        mt="7">
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

export async function getStaticProps(context) {
  const supabase = require('@supabase/supabase-js');
  const client = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  let { data: trending, error } = await client.from('trending').select('*');
  return {
    props: { trending }
  };
}

export default TrendingMovies;
