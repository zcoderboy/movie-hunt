import {
  Button,
  Container,
  Box,
  Text,
  VStack,
  useBreakpointValue as bp,
  useDisclosure
} from '@chakra-ui/react';
import Head from 'next/head';
import Hero from '../components/Hero';
import Footer from '../components/layout/Footer';
import Trending from '../components/Trending';
import SearchForm from '../components/forms/SearchForm';
import useUser from '../utils/useUser';
import Modal from '../components/Modal';
import RegisterForm from '../components/forms/RegisterForm';

export default function Home({ trending }) {
  const user = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Responsive breakpoints
  const container = bp({ base: '96vw', lg: '90vw' });
  const bannerText = bp({ base: 'md1', lg: 'md2' });
  return (
    <>
      <div>
        <VStack spacing="3rem" align="left">
          <Hero />
          <Container maxW={container} marginInlineStart="auto !important">
            <SearchForm />
            <Trending data={trending} />
          </Container>
          {!user && (
            <Box
              backgroundImage={`url(/images/banner-img.jpg)`}
              backgroundSize="100vw"
              backgroundPosition="center"
              pos="relative"
              h="180px">
              <Container pos="relative" zIndex="1" maxW={container} h="100%">
                <VStack align="left" justifyContent="center" h="100%">
                  <Text color="white" fontSize={bannerText}>
                    Register now and save your <br />
                    preferences to get better suggestions
                  </Text>
                  <Button alignSelf="start" bg="white" onClick={onOpen}>
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
      <Modal isOpen={isOpen} onClose={onClose} title={'Register'} size="md">
        <RegisterForm />
      </Modal>
      <Footer />
    </>
  );
}

export async function getStaticProps(context) {
  const supabase = require('@supabase/supabase-js');
  const client = supabase.createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  let { data: trending, error } = await client.from('trending').select('*').range(0, 3);
  return {
    props: { trending }
  };
}
