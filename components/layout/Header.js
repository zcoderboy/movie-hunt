import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useDisclosure,
  useBreakpointValue as bp,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  chakra,
  Link as CLink,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider
} from '@chakra-ui/react';
import { FaCog } from 'react-icons/fa';
import { MdMovie } from 'react-icons/md';
import { HiUser } from 'react-icons/hi';
import { FiPower } from 'react-icons/fi';
import supabase from '../../lib/supabaseClient';
import { BiLogIn } from 'react-icons/bi';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import Modal from '../Modal';
import PreferencesFrom from '../forms/PreferencesForm';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import LoginForm from '../forms/LoginForm';
import RegisterForm from '../forms/RegisterForm';
import { HiMenuAlt3 } from 'react-icons/hi';

const CMenu = chakra(Menu);

const Header = () => {
  const { logoutUser } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentModal, setCurrentModal] = useState({});
  const router = useRouter();
  const user = supabase.auth.user();
  const menuDisplay = bp({ base: 'none', lg: 'flex' });
  const handleLogout = () => {
    logoutUser()
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <Flex boxShadow="0 .5rem 1rem rgba(0,0,0,.15)" alignItems="center">
      {supabase.auth.session() && (
        <Container maxW={bp({ base: '96vw', lg: '90vw' })} py="5">
          <Flex justifyContent="space-between" align="center">
            <HStack spacing="1rem" alignItems="center">
              <Box as={HiUser} boxSize="25px" />
              <Text fontWeight="bold" fontSize={bp({ base: 'md', lg: 'md1' })}>
                {user.email}
              </Text>
            </HStack>
            <HStack spacing="1rem" d={menuDisplay}>
              <Button
                leftIcon={<FaCog />}
                colorScheme="primary"
                variant="outline"
                onClick={() => {
                  setCurrentModal({
                    title: 'Preferences',
                    component: <PreferencesFrom />
                  });
                  onOpen();
                }}>
                Update my preferences
              </Button>
              <Link href="/account/discover">
                <Button leftIcon={<MdMovie />} colorScheme="primary" variant="outline">
                  Discover shows
                </Button>
              </Link>
              <Box as={FiPower} boxSize="25px" onClick={handleLogout} cursor="pointer" />
            </HStack>
            <Box pos="relative" zIndex="1000" d={bp({ base: 'block', lg: 'none' })}>
              <CMenu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HiMenuAlt3 />}
                  size="lg"
                  variant="outline"
                />
                <MenuList>
                  <MenuItem
                    icon={<FaCog />}
                    onClick={() => {
                      setCurrentModal({
                        title: 'Preferences',
                        component: <PreferencesFrom />
                      });
                      onOpen();
                    }}>
                    Preferences
                  </MenuItem>
                  <CLink href="/account/discover">
                    <MenuItem icon={<MdMovie />}>Discover shows</MenuItem>
                  </CLink>
                  <MenuItem onClick={handleLogout} icon={<FiPower />}>
                    Log out
                  </MenuItem>
                </MenuList>
              </CMenu>
            </Box>
          </Flex>
        </Container>
      )}
      {!supabase.auth.session() && router.pathname !== '/' && (
        <Container maxW="90vw" py="5">
          <Flex justifyContent="space-between" align="center">
            <HStack spacing="1rem" alignItems="center">
              <Link href="/">
                <Text fontWeight="bold" fontSize="md1" cursor="pointer">
                  🎬 Movie Hunt
                </Text>
              </Link>
            </HStack>
            <HStack spacing="1rem">
              <Button
                leftIcon={<BiLogIn />}
                colorScheme="primary"
                variant="outline"
                onClick={() => {
                  setCurrentModal({
                    title: 'Login',
                    component: <LoginForm />
                  });
                  onOpen();
                }}>
                Login
              </Button>
              <Button
                onClick={() => {
                  setCurrentModal({
                    title: 'Register',
                    component: <RegisterForm />
                  });
                  onOpen();
                }}
                leftIcon={<HiUser />}
                colorScheme="primary"
                variant="outline">
                {' '}
                Register
              </Button>
            </HStack>
          </Flex>
        </Container>
      )}
      <Modal isOpen={isOpen} onClose={onClose} title={currentModal.title}>
        {currentModal.component}
      </Modal>
    </Flex>
  );
};

export default Header;
