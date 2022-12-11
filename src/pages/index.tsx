import { useEffect, useState } from 'react';

import { api } from '@services/axios';
import { ItemsExposition, ItemsList } from '@templates/itemsExposiotion';
import { DefaultFilter } from '@components/filters/default';

import * as Styled from '@styles/pages/homePage/styled';
import { SizeFilter } from '@components/filters/size';
import { ColorFilter } from '@components/filters/color';

export default function Home(): JSX.Element {
  const [items, setItems] = useState<ItemsList>([]);

  useEffect(() => {
    const getItems = async (): Promise<void> => {
      const { data } = await api.get('/api/items/all');
      setItems(data.items.data);
    };

    getItems();
  }, []);

  return (
    items.length && (
      <Styled.Container>
        <Styled.FilterSection>
          <span>Filtros</span>

          <div>
            <Styled.BrandFilters>
              <p>- Marca</p>
              <ul>
                <DefaultFilter
                  setItems={setItems}
                  filterOf="brand"
                  textFilter="Nike"
                />
                <DefaultFilter
                  setItems={setItems}
                  filterOf="brand"
                  textFilter="Adidas"
                />
                <DefaultFilter
                  setItems={setItems}
                  filterOf="brand"
                  textFilter="Vans"
                />
              </ul>
            </Styled.BrandFilters>

            <Styled.SizeFilters>
              <p>- Tamanho</p>
              <ul>
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="26"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="28"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="30"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="32"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="34"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="36"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="38"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  textFilter="40"
                />
              </ul>
            </Styled.SizeFilters>

            <Styled.ColorFilters>
              <p>- Cor</p>
              <ul>
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="red"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="green"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="blue"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="white"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="black"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="yellow"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  textFilter="perple"
                />
              </ul>
            </Styled.ColorFilters>
          </div>
        </Styled.FilterSection>

        <ItemsExposition itemsList={items} />
      </Styled.Container>
    )
  );
}
