import { VStack, Text, IconButton, HStack, Link } from '@chakra-ui/react';
import { AiOutlineTwitter, AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <VStack alignItems="center" justifyContent="center" h="100px" my="8">
      <Text textAlign="center" mb="3">
        Made with ❤️ by{' '}
        <Link textDecor="underline" to="https://twitter.com/zcoderboy" target="blank">
          @zcoderboy
        </Link>
        <br />
        Hashnode 2021 hackaton
      </Text>
      <HStack spacing="1rem">
        <IconButton
          isRound
          bg="#1da1f2"
          aria-label="Search database"
          icon={<AiOutlineTwitter color="#fff" />}
        />
        <IconButton
          isRound
          bg="#000"
          aria-label="Search database"
          icon={<AiFillGithub color="#fff" />}
        />
        <IconButton
          isRound
          colorScheme="blue"
          aria-label="Search database"
          icon={<AiFillLinkedin color="#fff" />}
        />
      </HStack>
    </VStack>
  );
};

export default Footer;
