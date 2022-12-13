import { ItemsOfTheCart } from '@contexts/shoppingCart/cart';

type GetItemQuantityInListParams = {
  id: string;
  itemsSavedInStorage: ItemsOfTheCart[];
};

function getItemQuantityInList({
  id,
  itemsSavedInStorage = [],
}: GetItemQuantityInListParams): number {
  const itemOfList = itemsSavedInStorage.find((item) => item.id === id);

  return itemOfList?.quantity;
}

export { getItemQuantityInList };
