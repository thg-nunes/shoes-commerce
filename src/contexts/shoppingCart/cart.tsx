import { api } from '@services/axios';
import { createContext, useContext, useState } from 'react';

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

  async function addItem(id: string): Promise<void> {
    const { data } = await api.get<AddItemResponse>(`/item/${id}`);

    setItems([
      ...items,
      {
        id,
        quantity: 1,
      },
    ]);
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
