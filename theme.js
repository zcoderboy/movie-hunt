import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    primary: {
      500: '#F97B2F'
    }
  },
  fonts: {
    body:
      "'Poppins', BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    heading:
      "'Poppins', BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
    mono: "'My Monospaced Font', monospace"
  },
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    md1: '20px',
    md2: '24px',
    lg: '32px',
    xl: '48px'
  }
});

export default customTheme;
