import { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';

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
    </ThemeProvider>
  );
}

export default MyApp;
