import { useEffect, useState } from 'react';

import { ItemsList } from '@templates/itemsExposiotion';
import { searchItemById } from '@utils/searchItemById';

import * as Styled from '@styles/pages/cart/styled';

type StorageItems = {
  id: string;
  quantity: number;
}[];

export default function Cart(): JSX.Element {
  const [itemsById, setItemsById] = useState<ItemsList>([]);

  useEffect(() => {
    const productsId: string[] = [];

    const userItemsList = localStorage.getItem('user@listItems');
    const userItemsListJson: StorageItems = JSON.parse(userItemsList);
    userItemsListJson.forEach((item) => productsId.push(item.id));

    const getItemsById = async (): Promise<void> => {
      const response = await searchItemById({ id: productsId });

      setItemsById(response.items);
    };

    getItemsById();
  }, []);

  return (
    <Styled.Container>
      <Styled.Table>
        <Styled.TableHead>
          <Styled.TableRow>
            <th />
            <th>PRODUTO</th>
            <th>QStyled.TableData</th>
            <th>SUBTOTAL</th>
          </Styled.TableRow>
        </Styled.TableHead>

        <tbody>
          {itemsById.map((item) => (
            <Styled.TableRow key={item.id}>
              <Styled.TableData>
                <img src={item.image} alt="shoes" />
              </Styled.TableData>
              <Styled.TableData>
                <p>{item.title}</p>
                <span>{item.price}</span>
              </Styled.TableData>
              <Styled.TableData>
                <button type="button">-</button>
                <input type="text" name="items quantity" />
                <button type="button">+</button>
              </Styled.TableData>
              <Styled.TableData>
                <span>{item.price}</span>
              </Styled.TableData>
            </Styled.TableRow>
          ))}
        </tbody>
      </Styled.Table>
    </Styled.Container>
  );
}
