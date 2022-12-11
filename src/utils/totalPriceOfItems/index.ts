import { useEffect, useState } from 'react';

import { ItemsList } from '@templates/itemsExposiotion';
import { ItemsOfTheCart } from '@contexts/shoppingCart/cart';

type UseReturnTotalPriceOfItemsParams = {
  itemsData: ItemsList;
};

const useReturnTotalPriceOfItems = ({
  itemsData,
}: UseReturnTotalPriceOfItemsParams): string => {
  const [totalPrice, setTotalPrice] = useState('');

  useEffect(() => {
    const userListItems = localStorage.getItem('user@listItems');
    const userListItemsInJson: ItemsOfTheCart[] = JSON.parse(userListItems);

    if (itemsData.length) {
      let total = 0;

      itemsData.forEach((item, index) => {
        if (item.id === userListItemsInJson[index].id) {
          total += Number(item.price) * userListItemsInJson[index].quantity;
        }
      });

      const totalPriceInBRL = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(total);

      setTotalPrice(totalPriceInBRL);
    }
  }, [itemsData]);

  return totalPrice;
};

export { useReturnTotalPriceOfItems };
