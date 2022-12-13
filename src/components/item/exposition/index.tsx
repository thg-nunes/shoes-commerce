import { Button } from '@components/button/addItem';
import { useCartContext } from '@contexts/shoppingCart/cart';
import { getItemQuantityInList } from '@utils/getItemQuantityList';
import * as Styled from './styled';

export type ItemProps = {
  id: string;
  title: string;
  src: string;
  price: string | number;
};

export function ExpositionItem({
  title,
  price,
  src,
  id,
}: ItemProps): JSX.Element {
  const { items, addItem } = useCartContext();

  return (
    <Styled.Container>
      <Styled.Details>
        <img src={src} alt="shoes" />
        <p>{title}</p>
        <Styled.Price>R$ {price}</Styled.Price>
      </Styled.Details>
      <Button
        quantityItemInCart={() =>
          getItemQuantityInList({ id, itemsSavedInStorage: items })
        }
        textButton="adicionar ao carrinho"
        actionOnClick={async () => {
          await addItem(id);
        }}
      />
    </Styled.Container>
  );
}
