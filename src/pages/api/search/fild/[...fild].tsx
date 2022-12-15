import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsByBrand(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { fild } = req.query;
    const [fildSelected, value] = fild;

    const responseByBrand = items.data.filter(
      (item) => item[fildSelected] === value
    );

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
