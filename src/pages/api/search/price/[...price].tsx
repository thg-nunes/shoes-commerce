import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsByBrand(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { price } = req.query;
    const [lowestPrice, highestPrice] = price;

    const itemsByPrice = [];

    items.data.forEach((item) => {
      if (
        item.price >= Number(lowestPrice) &&
        item.price <= Number(highestPrice)
      ) {
        itemsByPrice.push(item);
      }
    });

    return res.json({
      status: 'succes',
      items: itemsByPrice,
    });
  }

  return res.status(404).json({
    status: 'error',
    messsage: 'Metodo de requisição inválido.',
  });
}
