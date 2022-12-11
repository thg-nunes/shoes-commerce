import { api } from '@services/axios';

import { ItemsList } from '@templates/itemsExposiotion';
import { info } from 'console';

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
  try {
    const { data } = await api.get<Response>(`/api/item/${id}`);

    return data;
  } catch {
    return { status: 'success', items: [] };
  }
};

export { searchItemById };
