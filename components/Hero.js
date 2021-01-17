import { Box, Text, Container, Flex, Button, Link, HStack } from '@chakra-ui/react';

const Hero = () => {
  return (
    <Flex
      w="100vw"
      flexDir="column"
      backgroundImage={`url(/images/hero.jpg)`}
      h="50vh"
      backgroundSize="100vw"
      backgroundPosition="center"
      pos="relative">
      <Container
        d="flex"
        flexDir="column"
        h="100%"
        justifyContent="center"
        maxW="90vw"
        color="white"
        zIndex="100"
        pos="relative">
        <Box>
          <Text fontWeight="bold" fontSize="lg" lineHeight="1.2">
            What if you stop searching
            <br /> and start watching
          </Text>
          <Button mt="5" colorScheme="primary">
            Set my preferences
          </Button>
        </Box>
        <HStack spacing="1.5rem" pos="absolute" right="0" top="20px">
          <Link href="#" textDecor="underline" color="white" fontWeight="bold" fontSize="20px">
            Register
          </Link>
          <Link href="#" textDecor="underline" color="white" fontWeight="bold" fontSize="20px">
            Login
          </Link>
        </HStack>
      </Container>
      <Box
        w="100%"
        pos="absolute"
        left="0"
        top="0"
        h="100%"
        bgGradient="linear(to-r, rgba(0,0,0,0.5), rgba(0,0,0,0))"
      />
    </Flex>
  );
};

export default Hero;
