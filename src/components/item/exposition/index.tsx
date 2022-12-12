import { Button } from '@components/button/addItem';
import { ItemsOfTheCart, useCartContext } from '@contexts/shoppingCart/cart';
import { useEffect, useState } from 'react';
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
  const [itemsSaved, setItemsSaved] = useState<ItemsOfTheCart[]>([]);

  useEffect(() => {
    const itemsSavedInList = localStorage.getItem('user@listItems');
    const itemsSavedInListToJson: ItemsOfTheCart[] =
      JSON.parse(itemsSavedInList);
    setItemsSaved(itemsSavedInListToJson);
  }, [items]);

  function getItemQuantityInList(): number {
    const itemOfList = itemsSaved?.find((item) => item.id === id);

    return itemOfList?.quantity;
  }

  return (
    <Styled.Container>
      <Styled.Details>
        <img src={src} alt="shoes" />
        <p>{title}</p>
        <Styled.Price>R$ {price}</Styled.Price>
      </Styled.Details>
      <Button
        quantityItemInCart={() => getItemQuantityInList()}
        textButton="adicionar ao carrinho"
        actionOnClick={async () => {
          await addItem(id);
        }}
      />
    </Styled.Container>
  );
}
