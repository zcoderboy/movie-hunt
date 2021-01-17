import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Select,
  Box,
  Text,
  VStack,
  SimpleGrid
} from '@chakra-ui/react';
import Head from 'next/head';
import Hero from '../components/Hero';
import MovieCard from '../components/cards/MovieCard';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Movie Hunt</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VStack spacing="3rem" align="left">
        <Hero />
        <Container maxW="90vw" marginInlineStart="auto !important">
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
                <Button bg="#DE0913" color="white">
                  Netflix
                </Button>
                <Button bg="#1CAFDF" color="white">
                  Prime Video
                </Button>
              </HStack>
              <SimpleGrid columns={4} spacingX="40px" mt="4">
                <MovieCard />
                <MovieCard />
                <MovieCard />
                <MovieCard />
              </SimpleGrid>
            </Box>
          </VStack>
        </Container>
        <Box
          backgroundImage={`url(/images/banner-img.jpg)`}
          backgroundSize="100vw"
          backgroundPosition="center"
          pos="relative"
          h="180px">
          <Container pos="relative" zIndex="1" maxW="90vw" h="100%">
            <VStack align="left" justifyContent="center" h="100%">
              <Text color="white" fontSize="md2">
                Register now and save your <br />
                preferences to get better suggestions
              </Text>
              <Button alignSelf="start" bg="white">
                Register
              </Button>
            </VStack>
          </Container>
          <Box
            w="100%"
            pos="absolute"
            left="0"
            top="0"
            h="100%"
            bgGradient="linear(to-r, rgba(0,0,0,0.5), rgba(0,0,0,0))"
          />
        </Box>
      </VStack>
    </div>
  );
}
