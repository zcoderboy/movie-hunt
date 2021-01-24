import { Button, HStack, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { registerUser } = useContext(UserContext);

  const handleRegister = (e) => {
    e.preventDefault();
    registerUser({ email: email, password: password })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        alert('An error occurred. Try again later');
      });
  };

  return <FormBody setEmail={setEmail} setPassword={setPassword} handleSubmit={handleRegister} />;
};

export const FormBody = ({ setEmail, setPassword, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing="2rem" align="left">
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            h="3rem"
            focusBorderColor="#F97B2F"
            placeholder="Username"
          />
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
          <Button colorScheme="green" type="submit">
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
