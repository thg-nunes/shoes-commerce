import { toast } from 'react-toastify';
import React, { createContext, useContext, useEffect, useState } from 'react';

import axios from 'axios';

export type ItemsOfTheCart = {
  id: string;
  quantity: number;
};

type CartContextProps = {
  items: ItemsOfTheCart[];
  addItem: (id: string) => Promise<void>;
  removeItem: (id: string) => void;
  deleteItem: (id: string) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  brand: string;
};

type AddItemResponse = {
  status: 'success' | 'error';
  items: Item[];
};

const CartContext = createContext({} as CartContextProps);

function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [items, setItems] = useState<ItemsOfTheCart[]>([]);

  useEffect(() => {
    const itemsStorage = localStorage.getItem('user@listItems');

    if (itemsStorage) {
      const itemsSaved: ItemsOfTheCart[] = JSON.parse(itemsStorage);
      setItems(itemsSaved);
    }
  }, []);

  async function addItem(id: string): Promise<void> {
    const { data } = await axios.get<AddItemResponse>(`/api/item/${id}`);

    const requisitionItem = data.items[0];

    if (requisitionItem.stockQuantity <= 0) {
      toast.warn('Quantidade em estoque insuficiente', {
        autoClose: 3000,
      });

      return;
    }

    const produtAlreadyExists = items.find((item) => item.id === id);

    if (!produtAlreadyExists) {
      setItems([
        ...items,
        {
          id,
          quantity: 1,
        },
      ]);

      localStorage.setItem(
        'user@listItems',
        JSON.stringify([
          ...items,
          {
            id,
            quantity: 1,
          },
        ])
      );

      return;
    }

    if (
      produtAlreadyExists &&
      produtAlreadyExists.quantity >= requisitionItem.stockQuantity
    ) {
      toast.error('Quantidade no carrinho maior que estoque nosso estoque', {
        autoClose: 3000,
      });
    } else {
      const productQuantityUpdate = items.filter((item) => {
        if (item.id === id) {
          item.quantity += 1;
        }

        return item;
      });

      setItems([...productQuantityUpdate]);

      localStorage.setItem(
        'user@listItems',
        JSON.stringify(productQuantityUpdate)
      );
    }
  }

  function removeItem(id: string): void {
    const existsItemInTheCartList = items.find((item) => item.id === id);

    if (existsItemInTheCartList && existsItemInTheCartList.quantity - 1 <= 0) {
      toast.info('Item removido do carrinho', {
        autoClose: 3000,
      });

      const listUpdate = items.filter((item) => item.id !== id);
      setItems(listUpdate);

      localStorage.setItem('user@listItems', JSON.stringify(listUpdate));
      return;
    }

    if (existsItemInTheCartList && existsItemInTheCartList.quantity - 1 > 0) {
      const itemRemovedQuantity = items.filter((item) => {
        if (item.id === id) {
          item.quantity -= 1;
        }

        return item;
      });

      setItems([...itemRemovedQuantity]);

      localStorage.setItem(
        'user@listItems',
        JSON.stringify(itemRemovedQuantity)
      );
    }

    localStorage.setItem('user@listItems', JSON.stringify(items));
  }

  function deleteItem(id: string): void {
    const itemDeleted = items.filter((item) => item.id !== id);

    setItems([...itemDeleted]);

    toast.warn('Item deletado do carrinho', {
      autoClose: 3000,
    });

    localStorage.setItem('user@listItems', JSON.stringify(itemDeleted));
  }

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, deleteItem }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);

  return context;
};

export { useCartContext, CartProvider };
