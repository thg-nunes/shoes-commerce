import { api } from '@services/axios';

import { ItemsList } from '@templates/itemsExposiotion';

type SearchItemProps = {
  searchBy: string;
  filterOf: 'brand' | 'size' | 'color';
};

type Response = {
  status: 'success' | 'error';
  items: ItemsList;
};

const searchItem = async ({
  searchBy,
  filterOf,
}: SearchItemProps): Promise<Response> => {
  const { data } = await api.get<Response>(
    `/api/search/${filterOf}/${searchBy}`
  );

  return data;
};

export { searchItem };
