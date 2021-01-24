import { Box, Button, Container, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { HiUser } from 'react-icons/hi';
import { FiPower } from 'react-icons/fi';
import supabase from '../../lib/supabaseClient';
import withAuth from '../withAuth';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import Modal from '../Modal';
import MultiSelectSort from '../forms/MultiSelect';
import PreferencesFrom from '../forms/PreferencesForm';

const Header = () => {
  const { logoutUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = supabase.auth.user();
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Flex boxShadow="0 .5rem 1rem rgba(0,0,0,.15)" alignItems="center">
      <Container maxW="90vw" py="5">
        <Flex justifyContent="space-between" align="center">
          <HStack spacing="1rem" alignItems="center">
            <Box as={HiUser} boxSize="25px" />
            <Text fontWeight="bold">{user.email}</Text>
          </HStack>
          <HStack spacing="1rem">
            <Button leftIcon={<FaCog />} colorScheme="primary" variant="outline" onClick={onOpen}>
              Update my preferences
            </Button>
            <Button leftIcon={<MdMovie />} colorScheme="primary" variant="outline">
              Discover shows
            </Button>
            <Box as={FiPower} boxSize="25px" onClick={handleLogout} cursor="pointer" />
          </HStack>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose} title="Preferences">
        <PreferencesFrom />
      </Modal>
    </Flex>
  );
};

export default withAuth(Header);
