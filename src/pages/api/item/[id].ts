import { NextApiRequest, NextApiResponse } from 'next';
import listItems from '../items.json';

export default function ReturnsItemInformation(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { id } = req.query;

    const idToString = String(id);
    const itemsId = idToString.split(',');

    const inforItem = itemsId.map((itemId) => {
      return listItems.data.find((item) => item.id === itemId);
    });

    return res.json({
      status: 'success',
      items: inforItem,
    });
  }

  return res.status(404).json({
    status: 'error',
    message: 'Método incorreto',
  });
}
