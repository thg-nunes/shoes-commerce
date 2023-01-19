import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

import axios from 'axios';
import { ItemsOfTheCart } from '@contexts/shoppingCart/cart';

import { ItemsList } from '@templates/itemsExposiotion';

type GetItemQuantityInListParams = {
  id: string;
  itemsSavedInStorage: ItemsOfTheCart[];
};

type SearchItemProps = {
  searchBy: string;
  filterOf: 'brand' | 'size' | 'color';
};

type SearchByPriceProps = {
  lowestPrice: number;
  highestPrice: number;
};

type Response = {
  status: 'success' | 'error';
  items: ItemsList;
};

type SearchItemByIdProps = {
  id: string | string[];
};

type SetTimeToDisplayItems = {
  _timeToDisplayItems: boolean;
  setTimeToDisplay: Dispatch<SetStateAction<boolean>>;
};

type UseReturnTotalPriceOfItemsParams = {
  itemsData: ItemsList;
};

type SearchOfTheFormParams = {
  searchValue: string;
};

const getItemQuantityInList = ({
  id,
  itemsSavedInStorage = [],
}: GetItemQuantityInListParams): number => {
  const itemOfList = itemsSavedInStorage.find((item) => item.id === id);

  return itemOfList?.quantity;
};

const searchItem = async ({
  searchBy,
  filterOf,
}: SearchItemProps): Promise<Response> => {
  const { data } = await axios.get<Response>(
    `/api/search/fild/${filterOf}/${searchBy}`
  );

  return data;
};

const searchByPrice = async ({
  lowestPrice,
  highestPrice,
}: SearchByPriceProps): Promise<Response> => {
  const { data } = await axios.get<Response>(
    `/api/search/price/${lowestPrice}/${highestPrice}`
  );

  return data;
};

const searchItemById = async ({
  id,
}: SearchItemByIdProps): Promise<Response> => {
  try {
    const { data } = await axios.get<Response>(`/api/item/${id}`);

    return data;
  } catch {
    return { status: 'success', items: [] };
  }
};

const timeToDisplayItems = ({
  _timeToDisplayItems,
  setTimeToDisplay,
}: SetTimeToDisplayItems): void => {
  setTimeToDisplay(!_timeToDisplayItems);

  setTimeout(() => {
    setTimeToDisplay(true);
  }, 750);
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

const searchItemByFormText = async ({
  searchValue,
}: SearchOfTheFormParams): Promise<Response> => {
  const { data } = await axios.get<Response>(
    `/api/search/byForm/${searchValue}`
  );

  return data;
};

export {
  searchItem,
  searchByPrice,
  searchItemById,
  timeToDisplayItems,
  searchItemByFormText,
  getItemQuantityInList,
  useReturnTotalPriceOfItems,
};
