import { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

import { searchItemById } from '@utils/searchItemById';
import { useCartContext } from '@contexts/shoppingCart/cart';

import * as Styled from '@styles/pages/cart/styled';

type StorageItems = {
  id: string;
  quantity: number;
}[];

type ItemListPriceUpdate = {
  id: string;
  brand: string;
  title: string;
  description: string;
  image: string;
  size: number;
  stock: number;
  price: string;
}[];

export default function Cart(): JSX.Element {
  const { items, addItem, removeItem } = useCartContext();
  const [itemsById, setItemsById] = useState<ItemListPriceUpdate>([]);

  useEffect(() => {
    const productsId: string[] = [];

    const userItemsList = localStorage.getItem('user@listItems');
    const userItemsListJson: StorageItems = JSON.parse(userItemsList);
    userItemsListJson.forEach((item) => productsId.push(item.id));

    const getItemsById = async (): Promise<void> => {
      const response = await searchItemById({ id: productsId });

      const formatePrice = response.items.map((item) => {
        const price = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(item.price);

        return {
          ...item,
          price,
        };
      });

      setItemsById(formatePrice);
    };

    if (userItemsListJson.length) getItemsById();
  }, []);

  return (
    <Styled.Container hasItemInCartList={!!itemsById.length}>
      <Styled.Table>
        <Styled.TableHead>
          <Styled.TableRow>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
          </Styled.TableRow>
        </Styled.TableHead>

        <Styled.TableBody>
          {itemsById.map((item, index) => (
            <Styled.TableRow key={item.id}>
              <Styled.TableData>
                <img src={item.image} alt="shoes" />
              </Styled.TableData>
              <Styled.TableData>
                <p>{item.title}</p>
                <span>{item.price}</span>
              </Styled.TableData>
              <Styled.TableData>
                <Styled.SectionUpdateProductQuantity>
                  <AiOutlineMinusCircle
                    size={25}
                    fill="#7160C3"
                    onClick={() => removeItem(item.id)}
                  />
                  <span>{items[index]?.quantity || 0}</span>
                  <AiOutlinePlusCircle
                    size={25}
                    fill="#7160C3"
                    onClick={() => addItem(item.id)}
                  />
                </Styled.SectionUpdateProductQuantity>
              </Styled.TableData>
              <Styled.TableData>
                <span>{item.price}</span>
              </Styled.TableData>
            </Styled.TableRow>
          ))}
        </Styled.TableBody>
      </Styled.Table>
    </Styled.Container>
  );
}
