import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';

import { ItemsExposition, ItemsList } from '@templates/itemsExposiotion';
import { FiltersTemplate } from '@templates/filters';

import { Loading } from '@components/loading';
import { Footer } from '@components/footer';
import { MessageAndLink } from '@components/messageAndLink';

import * as Styled from '@styles/pages/homePage/styled';

export default function Home(): JSX.Element {
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
            timeToDisplayItems={timeToDisplayItems}
            setTimeToDisplayItems={setTimeToDisplayItems}
          />

          {timeToDisplayItems ? (
            <ItemsExposition itemsList={items} />
          ) : (
            <Loading />
          )}
          {timeToDisplayItems && <Footer />}
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
