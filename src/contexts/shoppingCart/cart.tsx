import { createContext, useContext, useState } from 'react';

type ItemsOfTheCart = {
  id: string;
  quantity: number;
};

type CartContextProps = {
  items: ItemsOfTheCart[];
  addItem: (id: string) => void;
  removeItem: (id: string) => void;
  deleteItem: (id: string) => void;
};

type CartProviderProps = {
  children: React.ReactNode;
};

const CartContext = createContext({} as CartContextProps);

function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [items, setItems] = useState<ItemsOfTheCart[]>([]);

  function addItem(id: string): void {}

  function removeItem(id: string): void {}

  function deleteItem(id: string): void {}

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
