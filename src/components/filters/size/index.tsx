import { searchItem } from '@utils/searchItem';

import { DefaultFilterProps } from '../default';

import * as Styled from './styled';

export function SizeFilter({
  textContent,
  searchBy,
  filterOf = 'size',
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.SizeOption
      onClick={async () => {
        const response = await searchItem({ searchBy, filterOf });
        setItems(response.items);
      }}
    >
      {textContent}
    </Styled.SizeOption>
  );
}
