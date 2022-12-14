import { searchItem } from '@utils/searchItem';

import { DefaultFilterProps } from '../default';

import * as Styled from './styled';

export function ColorFilter({
  searchBy,
  textContent,
  filterOf = 'color',
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.ColorOption
      onClick={async () => {
        const response = await searchItem({ searchBy, filterOf });
        setItems(response.items);
      }}
    >
      {textContent}
    </Styled.ColorOption>
  );
}
