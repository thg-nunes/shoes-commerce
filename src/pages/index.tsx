import { useEffect, useState } from 'react';

import { api } from '@services/axios';
import { ItemsExposition, ItemsList } from '@templates/itemsExposiotion';
import { DefaultFilter } from '@components/filters/default';

import { SizeFilter } from '@components/filters/size';
import { ColorFilter } from '@components/filters/color';

import * as Styled from '@styles/pages/homePage/styled';

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
          <span>Filtros |</span>

          <div>
            <Styled.BrandFilters>
              <p>Marca</p>
              <ul>
                <DefaultFilter
                  setItems={setItems}
                  filterOf="brand"
                  searchBy="Nike"
                  textContent="Nike"
                />
                <DefaultFilter
                  setItems={setItems}
                  filterOf="brand"
                  searchBy="Adidas"
                  textContent="Adidas"
                />
                <DefaultFilter
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
                  filterOf="size"
                  setItems={setItems}
                  searchBy="26"
                  textContent="26"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  searchBy="28"
                  textContent="28"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  searchBy="30"
                  textContent="30"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  searchBy="32"
                  textContent="32"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  searchBy="34"
                  textContent="34"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  searchBy="36"
                  textContent="36"
                />
                <SizeFilter
                  filterOf="size"
                  setItems={setItems}
                  searchBy="38"
                  textContent="38"
                />
                <SizeFilter
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
                  filterOf="color"
                  setItems={setItems}
                  searchBy="red"
                  textContent="Vermelho"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  searchBy="green"
                  textContent="Verde"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  searchBy="blue"
                  textContent="Azul"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  searchBy="white"
                  textContent="Branco"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  searchBy="black"
                  textContent="Preto"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  searchBy="yellow"
                  textContent="Amarelo"
                />
                <ColorFilter
                  filterOf="color"
                  setItems={setItems}
                  searchBy="perple"
                  textContent="Roxo"
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
