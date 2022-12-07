import { NextApiRequest, NextApiResponse } from 'next';
import listItems from '../items.json';

export default function ReturnSpecificItem(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { id } = req.query;

    const findItem = listItems.data.find((item) => item.id === id);
    return res.json({
      status: 'success',
      items: [findItem],
    });
  }

  return res.status(404).json({
    status: 'error',
    message: 'Método incorreto',
  });
}
