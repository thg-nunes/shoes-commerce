import { api } from '@services/axios';

import { ItemsList } from '@templates/itemsExposiotion';

type SearchItemByIdProps = {
  id: string | string[];
};

type Response = {
  status: 'success' | 'error';
  items: ItemsList;
};

const searchItemById = async ({
  id,
}: SearchItemByIdProps): Promise<Response> => {
  const { data } = await api.get<Response>(`/api/item/${id}`);

  return data;
};

export { searchItemById };
