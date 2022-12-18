import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from '@contexts/shoppingCart/cart';
import { ItemsBySearchProvider } from '@contexts/itemsBySearchForm';

import { Header } from '@components/header';

import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/global-styles';
import { Footer } from '@components/footer';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <ItemsBySearchProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ItemsBySearchProvider>
      </CartProvider>
      <GlobalStyles />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
