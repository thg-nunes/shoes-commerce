import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { ItemsList } from '@templates/itemsExposiotion';

type ItemsBySearchFormProps = {
  itemsBySearch: ItemsList;
  setItemsBySearch: Dispatch<SetStateAction<ItemsList>>;
};

type ItemsBySearchProviderProps = {
  children: ReactNode;
};

const ItemsBySearchContext = createContext({} as ItemsBySearchFormProps);

function ItemsBySearchProvider({
  children,
}: ItemsBySearchProviderProps): JSX.Element {
  const [itemsBySearch, setItemsBySearch] = useState<ItemsList>([]);

  return (
    <ItemsBySearchContext.Provider value={{ itemsBySearch, setItemsBySearch }}>
      {children}
    </ItemsBySearchContext.Provider>
  );
}

const useItemsBySearchContext = (): ItemsBySearchFormProps => {
  const context = useContext(ItemsBySearchContext);

  return context;
};

export { ItemsBySearchContext, ItemsBySearchProvider, useItemsBySearchContext };
