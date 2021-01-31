import { SearchContext } from '../context/SearchContext';
import { useContext, useEffect, useState } from 'react';
import {
  Box,
  Container,
  HStack,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
  useBreakpointValue as bp
} from '@chakra-ui/react';
import MovieCard from '../components/cards/MovieCard';
import Link from 'next/link';
import { AiFillHome, AiOutlineSearch } from 'react-icons/ai';
import { FaRegSadCry } from 'react-icons/fa';

const Search = () => {
  const { result } = useContext(SearchContext);
  const [render, setRender] = useState(false);

  const columns = bp({ base: 2, lg: 4 });
  const spacing = bp({ base: '20px', lg: '40px' });
  const mw = bp({ base: '96vw', lg: '90vw' });
  const display = bp({ base: 'none', lg: 'flex' });

  useEffect(() => {
    result.length !== 0 && setRender(true);
    return () => {};
  }, []);

  return (
    <Container maxW={mw} my="8">
      <Link href="/">
        <IconButton
          colorScheme="primary"
          mb="4"
          d={display}
          fontSize="20px"
          aria-label="Back to homepage"
          icon={<AiFillHome />}
        />
      </Link>
      {render && (
        <>
          <HStack mt="4">
            <Box as={AiOutlineSearch} boxSize="30px" />
            <Text fontSize="md2" fontWeight="bold">
              Search results
            </Text>
          </HStack>
          <SimpleGrid columns={columns} spacing={spacing} mt="7">
            {result.map((media) => {
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
          </SimpleGrid>
        </>
      )}
      {!render && (
        <VStack mt="10%">
          <Box as={AiOutlineSearch} boxSize="50px" />
          <Text fontSize="lg">No results found</Text>
        </VStack>
      )}
    </Container>
  );
};

export default Search;
