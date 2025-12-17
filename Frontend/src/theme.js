import { extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

const colors = {
  brand: {
    50: '#e3f8f5',
    100: '#c6eee8',
    200: '#9ee1d8',
    300: '#6fd1c5',
    400: '#41c1b3',
    500: '#21a89a',
    600: '#168077',
    700: '#0d5a54',
    800: '#073b38',
    900: '#031f1f',
  },
};

const theme = extendTheme({ config, colors });

export default theme;
