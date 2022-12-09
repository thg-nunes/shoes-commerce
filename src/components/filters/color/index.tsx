import { searchItem } from '@utils/searchItem';

import { DefaultFilterProps } from '../default';

import * as Styled from './styled';

export function ColorFilter({
  textFilter,
  filterOf,
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.ColorOption
      color={textFilter}
      onClick={async () => {
        const response = await searchItem({ searchBy: textFilter, filterOf });
        setItems(response.items);
      }}
    />
  );
}
