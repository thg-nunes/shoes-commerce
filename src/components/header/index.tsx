import { GiSonicShoes, GiBeachBag } from 'react-icons/gi';

import { useCartContext } from '@contexts/shoppingCart/cart';

import Link from 'next/link';
import * as Styled from './styled';

export function Header(): JSX.Element {
  const { items } = useCartContext();

  return (
    <Styled.Container>
      <Link href="/" passHref>
        <a>
          <Styled.Logo>
            <h3>COMMERCE-SHOES</h3>
            <GiSonicShoes size={35} name="shoes-icon" />
          </Styled.Logo>
        </a>
      </Link>
      <Link href="/cart" passHref>
        <a>
          <Styled.ShoppingCart>
            <Styled.TextSection>
              <p>Meu Carrinho</p>
              <span>{items.length} items</span>
            </Styled.TextSection>
            <GiBeachBag size={25} name="bag-icon" />
          </Styled.ShoppingCart>
        </a>
      </Link>
    </Styled.Container>
  );
}
