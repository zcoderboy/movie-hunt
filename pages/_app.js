import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../styles/globals.css';
import { UserProvider } from '../context/UserContext';
import { SearchProvider } from '../context/SearchContext';
import Header from '../components/layout/Header';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Head>
        <title>Movie Hunt - Discover movies and TV shows on your favorite streaming service.</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎬</text></svg>"
        />
      </Head>
      <DefaultSeo {...SEO} />
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
