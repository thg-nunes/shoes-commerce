import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiTwotoneDelete,
} from 'react-icons/ai';

import { useCartContext } from '@contexts/shoppingCart/cart';

import { searchItemById } from '@utils/getItemsData';
import { useReturnTotalPriceOfItems } from '@utils/getItemsData';

import { ItemsList } from '@templates/itemsExposiotion';

import * as Styled from '@styles/pages/cart/styled';
import Head from 'next/head';

type StorageItems = {
  id: string;
  quantity: number;
}[];

export type ItemListPriceUpdate = {
  id: string;
  brand: string;
  title: string;
  description: string;
  image: string;
  size: number;
  stock: number;
  price: string;
}[];

type CartProps = {
  setMenuMobileVisible: Dispatch<SetStateAction<boolean>>;
};

export default function Cart({ setMenuMobileVisible }: CartProps): JSX.Element {
  const { items, addItem, removeItem, deleteItem } = useCartContext();
  const [itemsData, setItemsData] = useState<ItemsList>([]);
  const [itemsById, setItemsById] = useState<ItemListPriceUpdate>([]);
  const totalPriceOfList = useReturnTotalPriceOfItems({
    itemsData,
  });

  useEffect(() => {
    const productsId: string[] = [];

    const userItemsList = localStorage.getItem('user@listItems');
    const userItemsListJson: StorageItems = JSON.parse(userItemsList);
    userItemsListJson?.forEach((item) => productsId.push(item.id));

    const getItemsById = async (): Promise<void> => {
      const response = await searchItemById({ id: productsId });
      setItemsData(response.items);

      const formatePrice = response.items.map((item) => {
        const price = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(Number(item.price));

        return {
          ...item,
          price,
        };
      });

      setItemsById(formatePrice);
    };

    if (userItemsListJson?.length) getItemsById();

    setMenuMobileVisible(false);
  }, [items]);

  return (
    <>
      <Head>
        <title>C-SHOES | Cart</title>
      </Head>
      <Styled.Container hasItemInCartList={!!items.length}>
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
                      name="remove-quantity-item"
                      onClick={() => removeItem(item.id)}
                    />
                    <span className="quantityItem">
                      {items[index]?.quantity || 0}
                    </span>
                    <AiOutlinePlusCircle
                      size={25}
                      name="add-quantity-item"
                      fill="#7160C3"
                      onClick={() => addItem(item.id)}
                    />
                  </Styled.SectionUpdateProductQuantity>
                </Styled.TableData>
                <Styled.TableData>
                  <Styled.SectionSubtotal>
                    <span>{item.price}</span>
                    <AiTwotoneDelete
                      size={25}
                      name="delete-item"
                      fill="#7160C3"
                      onClick={() => deleteItem(item.id)}
                    />
                  </Styled.SectionSubtotal>
                </Styled.TableData>
              </Styled.TableRow>
            ))}
          </Styled.TableBody>

          <Styled.TableFooter>
            <Styled.TableRow>
              <Styled.TableData>
                <Styled.Button>Finalizar Pedido</Styled.Button>
              </Styled.TableData>
              <Styled.TableData />
              <Styled.TableData />
              <Styled.TableData>
                <span>TOTAL </span>
                {totalPriceOfList}
              </Styled.TableData>
            </Styled.TableRow>
          </Styled.TableFooter>
        </Styled.Table>
      </Styled.Container>
    </>
  );
}
