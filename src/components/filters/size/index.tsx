import { searchItem } from '@utils/searchItem';

import { DefaultFilterProps } from '../default';

import * as Styled from './styled';

export function SizeFilter({
  textFilter,
  filterOf,
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.SizeOption
      onClick={async () => {
        const response = await searchItem({ searchBy: textFilter, filterOf });
        setItems(response.items);
      }}
    >
      {textFilter}
    </Styled.SizeOption>
  );
}
