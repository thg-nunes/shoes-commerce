import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from '@components/header';
import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/global-styles';
import { CartProvider } from '@contexts/shoppingCart/cart';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <Header />
        <Component {...pageProps} />
      </CartProvider>
      <GlobalStyles />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
