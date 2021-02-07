import { FormBody } from './RegisterForm';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    loginUser({ email: email, password: password })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        alert("Couldn't find an account with the provided credentials.");
      });
  };
  return (
    <FormBody
      isLoading={isLoading}
      setEmail={setEmail}
      helper={false}
      setPassword={setPassword}
      handleSubmit={handleLogin}
    />
  );
};

export default LoginForm;
