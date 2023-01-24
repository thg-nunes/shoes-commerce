import { useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from '@contexts/shoppingCart/cart';
import { ItemsBySearchProvider } from '@contexts/itemsBySearchForm';

import { Header } from '@components/header';
import { Footer } from '@components/footer';

import { theme } from '@styles/theme';
import { GlobalStyles } from '@styles/global-styles';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const [menuMobileVisible, setMenuMobileVisible] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CartProvider>
        <ItemsBySearchProvider>
          <Header
            menuMobileVisible={menuMobileVisible}
            setMenuMobileVisible={setMenuMobileVisible}
          />
          <Component
            {...pageProps}
            menuMobileVisible={menuMobileVisible}
            setMenuMobileVisible={setMenuMobileVisible}
          />
          <Footer />
        </ItemsBySearchProvider>
      </CartProvider>
      <GlobalStyles />
      <ToastContainer />
    </ThemeProvider>
  );
}

export default MyApp;
