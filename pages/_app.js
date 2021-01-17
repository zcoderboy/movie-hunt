import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';
import Footer from '../components/layout/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS={true}>
      <Component {...pageProps} />
      <Footer />
    </ChakraProvider>
  );
}

export default MyApp;
