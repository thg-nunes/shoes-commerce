import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsBySize(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { size } = req.query;

    const responseBySize = items.data.filter(
      (item) => item.size <= Number(size) - 2 || item.size <= Number(size) + 2
    );

    return res.json({
      status: 'success',
      items: responseBySize,
    });
  }

  return res.status(404).json({
    status: 'error',
    messsage: 'Metodo de requisição inválido.',
  });
}
