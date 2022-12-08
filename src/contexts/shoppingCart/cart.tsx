import { toast } from 'react-toastify';
import React, { createContext, useContext, useEffect, useState } from 'react';

import { api } from '@services/axios';

type ItemsOfTheCart = {
  id: string;
  quantity: number;
};

type CartContextProps = {
  items: ItemsOfTheCart[];
  addItem: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
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

    setItems([]);
  }, []);

  async function addItem(id: string): Promise<void> {
    const { data } = await api.get<AddItemResponse>(`/api/item/${id}`);

    const requisitionItem = data.items[0];

    if (requisitionItem.stockQuantity <= 0) {
      toast.error('Quantidade em estoque insuficiente', {
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
    }

    const productQuantityUpdate = items.filter((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }

      return item;
    });

    if (
      produtAlreadyExists &&
      produtAlreadyExists.quantity > requisitionItem.stockQuantity
    ) {
      toast.error('Quantidade no carrinho maior que estoque nosso estoque', {
        autoClose: 3000,
      });
    }

    setItems([...productQuantityUpdate]);
  }

  async function removeItem(id: string): Promise<void> {}

  async function deleteItem(id: string): Promise<void> {}

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
