import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';
import { UserProvider } from '../context/UserContext';
import { SearchProvider } from '../context/SearchContext';
import Header from '../components/layout/Header';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SearchProvider>
        <ChakraProvider theme={theme} resetCSS={true}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </SearchProvider>
    </UserProvider>
  );
}

export default MyApp;
