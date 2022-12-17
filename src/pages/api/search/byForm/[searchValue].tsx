import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsByBrand(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { searchValue } = req.query;

    const responseBySearch = items.data.filter(
      (item) =>
        item.title
          .toLocaleLowerCase()
          .match(String(searchValue).toLocaleLowerCase()) ||
        item.description
          .toLocaleLowerCase()
          .match(String(searchValue).toLocaleLowerCase())
    );

    return res.json({
      status: 'success',
      items: responseBySearch,
    });
  }

  return res.status(404).json({
    status: 'error',
    messsage: 'Metodo de requisição inválido.',
  });
}
