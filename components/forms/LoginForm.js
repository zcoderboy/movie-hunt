import { FormBody } from './RegisterForm';
import { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginUser({ email: email, password: password })
      .then(() => {
        window.location.href = '/';
      })
      .catch((error) => {
        alert('An error occurred. Try again later');
      });
  };
  return <FormBody setEmail={setEmail} setPassword={setPassword} handleSubmit={handleLogin} />;
};

export default LoginForm;
