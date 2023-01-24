import axios from 'axios';
import Head from 'next/head';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';

import { ItemsExposition, ItemsList } from '@templates/itemsExposiotion';
import { FiltersTemplate } from '@templates/filters';

import { Loading } from '@components/loading';
import { MessageAndLink } from '@components/messageAndLink';

import * as Styled from '@styles/pages/homePage/styled';

type HomeProps = {
  menuMobileVisible: boolean;
  setMenuMobileVisible: Dispatch<SetStateAction<boolean>>;
};

export default function Home({
  menuMobileVisible,
  setMenuMobileVisible,
}: HomeProps): JSX.Element {
  const [items, setItems] = useState<ItemsList>([]);
  const [timeToDisplayItems, setTimeToDisplayItems] = useState(false);
  const { itemsBySearch } = useItemsBySearchContext();

  useEffect(() => {
    const getItems = async (): Promise<void> => {
      if (itemsBySearch.length !== 0) {
        setTimeToDisplayItems(false);

        setItems(itemsBySearch);

        setTimeout(() => {
          setTimeToDisplayItems(true);
        }, 1000);
      } else {
        setTimeToDisplayItems(false);

        const { data } = await axios.get('/api/items/all');
        setItems(data.items.data);

        setTimeout(() => {
          setTimeToDisplayItems(true);
        }, 1000);
      }
    };

    getItems();
  }, [itemsBySearch]);

  return (
    <>
      <Head>
        <title>C-SHOES | Home</title>
      </Head>
      {items.length !== 0 ? (
        <Styled.Container>
          <FiltersTemplate
            setItems={setItems}
            menuMobileVisible={menuMobileVisible}
            setMenuMobileVisible={setMenuMobileVisible}
            timeToDisplayItems={timeToDisplayItems}
            setTimeToDisplayItems={setTimeToDisplayItems}
          />

          {timeToDisplayItems ? (
            <ItemsExposition itemsList={items} />
          ) : (
            <Loading />
          )}
        </Styled.Container>
      ) : (
        <MessageAndLink
          href="/c-shoes/home"
          textLink="Voltar ao inicio."
          textMessage="Sem estoque para a opção desejada."
        />
      )}
    </>
  );
}
