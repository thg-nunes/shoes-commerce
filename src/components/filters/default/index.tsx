import { Dispatch, SetStateAction } from 'react';

import { searchItem } from '@utils/searchItem';
import { ItemsList } from '@templates/itemsExposiotion';
import * as Styled from './styled';

export type DefaultFilterProps = {
  textFilter: string;
  filterOf: 'brand' | 'size' | 'color';
  setItems: Dispatch<SetStateAction<ItemsList>>;
};

export function DefaultFilter({
  textFilter,
  filterOf,
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.Container
      onClick={async () => {
        const response = await searchItem({ searchBy: textFilter, filterOf });
        setItems(response.items);
      }}
    >
      {textFilter}
    </Styled.Container>
  );
}
