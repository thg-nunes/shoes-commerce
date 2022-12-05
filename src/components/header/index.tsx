import { GiSonicShoes, GiBeachBag } from 'react-icons/gi';

import { useCartContext } from '@contexts/shoppingCart/cart';

import * as Styled from './styled';

export function Header(): JSX.Element {
  const { items } = useCartContext();

  return (
    <Styled.Container>
      <Styled.Logo>
        <h3>COMMERCE-SHOES</h3>
        <GiSonicShoes size={35} name="shoes-icon" />
      </Styled.Logo>
      <Styled.ShoppingCart>
        <Styled.TextSection>
          <p>Meu Carrinho</p>
          <span>{items.length} items</span>
        </Styled.TextSection>
        <GiBeachBag size={25} name="bag-icon" />
      </Styled.ShoppingCart>
    </Styled.Container>
  );
}
