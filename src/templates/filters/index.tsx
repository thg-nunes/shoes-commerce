import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { IoMdCart, IoMdCloseCircle } from 'react-icons/io';

import { ItemsList } from '@templates/itemsExposiotion';

import { SizeFilter } from '@components/filters/size';
import { BrandFilter } from '@components/filters/brand';
import { ColorFilter } from '@components/filters/color';
import { FormSearchByPrice } from '@components/searchByPrice';

import * as Styled from './styled';

export type FiltersTemplateProps = {
  menuMobileVisible: boolean;
  timeToDisplayItems: boolean;
  setItems: Dispatch<SetStateAction<ItemsList>>;
  setMenuMobileVisible: Dispatch<SetStateAction<boolean>>;
  setTimeToDisplayItems: Dispatch<SetStateAction<boolean>>;
};

export function FiltersTemplate({
  setItems,
  menuMobileVisible,
  timeToDisplayItems,
  setMenuMobileVisible,
  setTimeToDisplayItems,
}: FiltersTemplateProps): JSX.Element {
  return (
    <Styled.FilterSection menuMobileVisible={menuMobileVisible}>
      <span>
        Filtros
        <IoMdCloseCircle
          size={25}
          onClick={() => setMenuMobileVisible(false)}
        />
      </span>

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

        <Link href="/c-shoes/cart" passHref>
          <Styled.GoToCartMobileResponsivity>
            <IoMdCart size={20} />
            <p>Meu Carrinho</p>
          </Styled.GoToCartMobileResponsivity>
        </Link>
      </div>
    </Styled.FilterSection>
  );
}
