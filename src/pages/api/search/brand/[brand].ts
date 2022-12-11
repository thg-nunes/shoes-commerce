import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsByBrand(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { brand } = req.query;

    const responseByBrand = items.data.filter((item) => item.brand === brand);

    return res.json({
      status: 'success',
      items: responseByBrand,
    });
  }

  return res.status(404).json({
    status: 'error',
    messsage: 'Metodo de requisição inválido.',
  });
}
