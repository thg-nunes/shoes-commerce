import { Button } from '@components/button/addItem';
import { useCartContext } from '@contexts/shoppingCart/cart';
import * as Styled from './styled';

export type ItemProps = {
  id: string;
  title: string;
  src: string;
  price: number;
};

export function ExpositionItem({
  title,
  price,
  src,
  id,
}: ItemProps): JSX.Element {
  const { addItem } = useCartContext();

  return (
    <Styled.Container>
      <Styled.Details>
        <img src={src} alt="shoes" />
        <p>{title}</p>
        <Styled.Price>R$ {price}</Styled.Price>
      </Styled.Details>
      <Button
        textButton="adicionar ao carrinho"
        actionOnClick={async () => {
          await addItem(id);
        }}
      />
    </Styled.Container>
  );
}
