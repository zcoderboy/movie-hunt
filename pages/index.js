import { Button, Container, Box, Text, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Hero from '../components/Hero';
import supabase from '../lib/supabaseClient';
import Footer from '../components/layout/Footer';
import Trending from '../components/Trending';

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Movie Hunt</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <VStack spacing="3rem" align="left">
          <Hero />
          <Container maxW="90vw" marginInlineStart="auto !important">
            <Trending />
          </Container>
          {!supabase.auth.session() && (
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
          )}
        </VStack>
      </div>
      <Footer />
    </>
  );
}
