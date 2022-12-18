import { Dispatch, SetStateAction } from 'react';

import { searchItem } from '@utils/getItemsData';
import { timeToDisplayItems } from '@utils/getItemsData';
import { ItemsList } from '@templates/itemsExposiotion';
import * as Styled from './styled';

export type BrandFilterProps = {
  searchBy: string;
  textContent?: string;
  filterOf: 'brand' | 'size' | 'color';
  _timeToDisplayItems: boolean;
  setTimeToDisplayItems: Dispatch<SetStateAction<boolean>>;
  setItems: Dispatch<SetStateAction<ItemsList>>;
};

export function BrandFilter({
  searchBy,
  textContent,
  filterOf = 'brand',
  setItems,
  _timeToDisplayItems = false,
  setTimeToDisplayItems,
}: BrandFilterProps): JSX.Element {
  return (
    <Styled.Container
      onClick={async () => {
        const response = await searchItem({ searchBy, filterOf });
        setItems(response.items);
        timeToDisplayItems({
          _timeToDisplayItems,
          setTimeToDisplay: setTimeToDisplayItems,
        });
      }}
    >
      {textContent}
    </Styled.Container>
  );
}
