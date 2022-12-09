import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsByColor(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { color } = req.query;

    const responseByColor = items.data.filter(
      (item) => item.color === String(color)
    );

    return res.json({
      status: 'success',
      items: responseByColor,
    });
  }

  return res.status(404).json({
    status: 'error',
    messsage: 'Metodo de requisição inválido.',
  });
}
