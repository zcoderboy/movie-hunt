import {
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormHelperText
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { registerUser } = useContext(UserContext);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    registerUser({ email: email, password: password })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Couldn't register your account.");
      });
  };

  return (
    <FormBody
      isLoading={isLoading}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleRegister}
      helper={false}
    />
  );
};

export const FormBody = ({ isLoading, setEmail, setPassword, handleSubmit, helper }) => {
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="2rem" align="left">
        <FormControl id="username" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            h="3rem"
            focusBorderColor="#F97B2F"
            placeholder="Username"
          />
          <FormHelperText d={helper ? 'block' : 'none'}>
            Throw in a dummy email if you want, just need it to save your preferences.
          </FormHelperText>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            h="3rem"
            focusBorderColor="#F97B2F"
            placeholder="********"
          />
        </FormControl>
        <HStack spacing="1rem">
          <Button isLoading={isLoading} colorScheme="green" type="submit">
            Submit
          </Button>
          <Button colorScheme="red" type="reset">
            Cancel
          </Button>
        </HStack>
      </VStack>
    </form>
  );
};

export default RegisterForm;
