import { useEffect, useState } from 'react';

import { api } from '@services/axios';
import { ItemsExposition, ItemsList } from '@templates/itemsExposiotion';
import { DefaultFilter } from '@components/filters/default';

import { Loading } from '@components/loading';
import { SizeFilter } from '@components/filters/size';
import { ColorFilter } from '@components/filters/color';

import * as Styled from '@styles/pages/homePage/styled';
import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';

export default function Home(): JSX.Element {
  const [items, setItems] = useState<ItemsList>([]);
  const [timeToDisplayItems, setTimeToDisplayItems] = useState(false);
  const { itemsBySearch } = useItemsBySearchContext();

  useEffect(() => {
    const getItems = async (): Promise<void> => {
      if (itemsBySearch.length !== 0) {
        setItems(itemsBySearch);
      } else {
        const { data } = await api.get('/api/items/all');
        setItems(data.items.data);
      }
    };

    setTimeout(() => {
      setTimeToDisplayItems(!timeToDisplayItems);
    }, 750);
    getItems();
  }, [itemsBySearch]);

  return items.length !== 0 ? (
    <Styled.Container>
      <Styled.FilterSection>
        <span>Filtros |</span>

        <div>
          <Styled.BrandFilters>
            <p>Marca</p>
            <ul>
              <DefaultFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                setItems={setItems}
                filterOf="brand"
                searchBy="Nike"
                textContent="Nike"
              />
              <DefaultFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                setItems={setItems}
                filterOf="brand"
                searchBy="Adidas"
                textContent="Adidas"
              />
              <DefaultFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                setItems={setItems}
                filterOf="brand"
                searchBy="Vans"
                textContent="Vans"
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
                searchBy="red"
                textContent="Vermelho"
              />
              <ColorFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                filterOf="color"
                setItems={setItems}
                searchBy="green"
                textContent="Verde"
              />
              <ColorFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                filterOf="color"
                setItems={setItems}
                searchBy="blue"
                textContent="Azul"
              />
              <ColorFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                filterOf="color"
                setItems={setItems}
                searchBy="white"
                textContent="Branco"
              />
              <ColorFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                filterOf="color"
                setItems={setItems}
                searchBy="black"
                textContent="Preto"
              />
              <ColorFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                filterOf="color"
                setItems={setItems}
                searchBy="yellow"
                textContent="Amarelo"
              />
              <ColorFilter
                setTimeToDisplayItems={setTimeToDisplayItems}
                _timeToDisplayItems={timeToDisplayItems}
                filterOf="color"
                setItems={setItems}
                searchBy="perple"
                textContent="Roxo"
              />
            </ul>
          </Styled.ColorFilters>
        </div>
      </Styled.FilterSection>

      {timeToDisplayItems ? <ItemsExposition itemsList={items} /> : <Loading />}
    </Styled.Container>
  ) : (
    <Styled.MessageInfo>
      <h2>Sem estoque para a opção desejada.</h2>
      <a href="/c-shoes/home">Voltar ao inicio.</a>
    </Styled.MessageInfo>
  );
}
