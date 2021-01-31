import {
  Box,
  Text,
  Container,
  Flex,
  Button,
  Link,
  HStack,
  useMediaQuery,
  useBreakpointValue as bp,
  useDisclosure
} from '@chakra-ui/react';
import RegisterForm from './forms/RegisterForm';
import Modal from './Modal';
import { useState, useEffect } from 'react';
import supabase from '../lib/supabaseClient';
import LoginForm from './forms/LoginForm';

const Hero = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalState, setModalState] = useState(1);

  const openModal = (modal) => {
    setModalState(modal);
    onOpen();
  };

  useEffect(() => {}, []);

  return (
    <Flex
      w="100vw"
      flexDir="column"
      backgroundImage={`url(/images/hero.jpg)`}
      h={bp({ base: '30vh', lg: '50vh' })}
      backgroundSize="100vw"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      pos="relative">
      {/* {console.log(md)} */}
      <Container
        d="flex"
        flexDir="column"
        h="100%"
        justifyContent="center"
        maxW={bp({ base: '96vw', lg: '90vw' })}
        color="white"
        zIndex="100"
        pos="relative">
        <Box>
          <Text fontWeight="bold" fontSize={bp({ base: 'md1', lg: 'lg' })} lineHeight="1.2">
            What if you stop searching
            <br /> and start watching
          </Text>
          <Button mt="5" colorScheme="primary">
            Set my preferences
          </Button>
        </Box>
        {!supabase.auth.session() && (
          <HStack spacing="1.5rem" pos="absolute" right="0" top="20px">
            <Link
              href="#"
              onClick={() => openModal(1)}
              textDecor="underline"
              color="white"
              fontWeight="bold"
              fontSize={bp({ base: '18px', lg: '20px' })}>
              Register
            </Link>
            <Link
              href="#"
              onClick={() => openModal(2)}
              textDecor="underline"
              color="white"
              fontWeight="bold"
              fontSize={bp({ base: '18px', lg: '20px' })}>
              Login
            </Link>
          </HStack>
        )}
      </Container>
      <Box
        w="100%"
        pos="absolute"
        left="0"
        top="0"
        h="100%"
        bgGradient="linear(to-r, rgba(0,0,0,0.5), rgba(0,0,0,0))"
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={modalState == 1 ? 'Register' : 'Login'}
        size="md">
        {modalState == 1 ? <RegisterForm /> : <LoginForm />}
      </Modal>
    </Flex>
  );
};

export default Hero;
