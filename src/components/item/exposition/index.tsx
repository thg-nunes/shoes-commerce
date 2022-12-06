import { Button } from '@components/button/addItem';
import * as Styled from './styled';

export type ItemProps = {
  title: string;
  src: string;
  price: number;
};

export function Item({ title, price, src }: ItemProps): JSX.Element {
  return (
    <Styled.Container>
      <Styled.Details>
        <img src={src} alt="shoes" />
        <p>{title}</p>
        <Styled.Price>R$ {price}</Styled.Price>
      </Styled.Details>
      <Button textButton="adicionar ao carrinho" />
    </Styled.Container>
  );
}
