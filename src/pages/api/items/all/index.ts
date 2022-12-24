import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnAllItems(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    return res.json({
      status: 'success',
      items,
    });
  }

  return res.status(404).json({
    status: 'error',
    messsage: 'Metodo de requisição inválido.',
  });
}
