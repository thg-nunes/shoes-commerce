import { NextApiRequest, NextApiResponse } from 'next';

import items from '../../items.json';

export default function returnItemsByBrand(
  req: NextApiRequest,
  res: NextApiResponse
): void {
  if (req.method === 'GET') {
    const { fild } = req.query;
    const [fildSelected, value] = fild;

    let responseByBrand = [];

    switch (fildSelected) {
      case 'brand':
        responseByBrand = items.data.filter(
          (item) => item[fildSelected] === value
        );
        break;
      case 'size':
        items.data.forEach((item) =>
          item[fildSelected].forEach((element) => {
            if (element === Number(value)) {
              responseByBrand.push(item);
            }
          })
        );
        break;
      case 'color':
        responseByBrand = items.data.filter(
          (item) =>
            item[fildSelected] === value ||
            item.title.toLowerCase().match(value.toLowerCase()) ||
            item.description.toLowerCase().match(value.toLowerCase())
        );
        break;
      default:
        break;
    }

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
