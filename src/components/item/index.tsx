import { Button } from '@components/button/addItem';
import * as Styled from './styled';

export type ItemProps = {
  title: string;
  size: number;
  stock: number;
  price: number;
  brand: string;
};

export function Item({
  size,
  title,
  brand,
  stock,
  price,
}: ItemProps): JSX.Element {
  return (
    <Styled.Container>
      <img src="" alt="shoes" />
      <Styled.Details>
        <Styled.Title>{title}</Styled.Title>
        <Styled.ShoesDetailsSection>
          <span>marca: {brand}</span>
          <span>tamanho: {size}</span>
          <span>em estoque: {stock}</span>
        </Styled.ShoesDetailsSection>
        <Styled.Price>R$ {price}</Styled.Price>
      </Styled.Details>

      <Button textButton="adicionar ao carrinho" />
    </Styled.Container>
  );
}
