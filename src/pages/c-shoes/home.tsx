import { useEffect, useState } from 'react';

import axios from 'axios';
import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';

import { ItemsExposition, ItemsList } from '@templates/itemsExposiotion';

import { BrandFilter } from '@components/filters/brand';
import { FormSearchByPrice } from '@components/searchByPrice';
import { Loading } from '@components/loading';
import { SizeFilter } from '@components/filters/size';
import { ColorFilter } from '@components/filters/color';
import { Footer } from '@components/footer';

import * as Styled from '@styles/pages/homePage/styled';
import Head from 'next/head';

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
          <Styled.FilterSection>
            <span>Filtros |</span>

            <div>
              <Styled.BrandFilters>
                <p>Marca</p>
                <ul>
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Nike"
                    textContent="Nike"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Adidas"
                    textContent="Adidas"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Vr"
                    textContent="Vr"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Asics"
                    textContent="Asics"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Oakley"
                    textContent="Oakley"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Mizuno"
                    textContent="Mizuno"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Skechers"
                    textContent="Skechers"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Mizuno"
                    textContent="Mizuno"
                  />
                  <BrandFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    setItems={setItems}
                    filterOf="brand"
                    searchBy="Olympikus"
                    textContent="Olympikus"
                  />
                </ul>
              </Styled.BrandFilters>

              <Styled.SizeFilters>
                <p>Tamanho</p>
                <ul>
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="26"
                    textContent="26"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="28"
                    textContent="28"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="30"
                    textContent="30"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="32"
                    textContent="32"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="34"
                    textContent="34"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="36"
                    textContent="36"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="38"
                    textContent="38"
                  />
                  <SizeFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="size"
                    setItems={setItems}
                    searchBy="40"
                    textContent="40"
                  />
                </ul>
              </Styled.SizeFilters>

              <Styled.ColorFilters>
                <p>Cor</p>
                <ul>
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Vermelho"
                    textContent="Vermelho"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Verde"
                    textContent="Verde"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Chumbo"
                    textContent="Chumbo"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Azul"
                    textContent="Azul"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Marinho"
                    textContent="Marinho"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Bege"
                    textContent="Bege"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Marrom"
                    textContent="Marrom"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Branco"
                    textContent="Branco"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Preto"
                    textContent="Preto"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Amarelo"
                    textContent="Amarelo"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Pink"
                    textContent="Pink"
                  />
                  <ColorFilter
                    setTimeToDisplayItems={setTimeToDisplayItems}
                    _timeToDisplayItems={timeToDisplayItems}
                    filterOf="color"
                    setItems={setItems}
                    searchBy="Marinho"
                    textContent="Marinho"
                  />
                </ul>
              </Styled.ColorFilters>

              <Styled.FormSearchByPrice>
                <p>Preço</p>
                <FormSearchByPrice />
              </Styled.FormSearchByPrice>
            </div>
          </Styled.FilterSection>

          {timeToDisplayItems ? (
            <ItemsExposition itemsList={items} />
          ) : (
            <Loading />
          )}
          {timeToDisplayItems && <Footer />}
        </Styled.Container>
      ) : (
        <Styled.MessageInfo>
          <h2>Sem estoque para a opção desejada.</h2>
          <a href="/c-shoes/home">Voltar ao inicio.</a>
        </Styled.MessageInfo>
      )}
    </>
  );
}
