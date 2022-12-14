import { Dispatch, SetStateAction } from 'react';

import { searchItem } from '@utils/searchItem';
import { ItemsList } from '@templates/itemsExposiotion';
import * as Styled from './styled';

export type DefaultFilterProps = {
  searchBy: string;
  textContent?: string;
  filterOf: 'brand' | 'size' | 'color';
  setItems: Dispatch<SetStateAction<ItemsList>>;
};

export function DefaultFilter({
  searchBy,
  textContent,
  filterOf = 'brand',
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.Container
      onClick={async () => {
        const response = await searchItem({ searchBy, filterOf });
        setItems(response.items);
      }}
    >
      {textContent}
    </Styled.Container>
  );
}
