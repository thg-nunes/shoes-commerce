import { searchItem } from '@utils/getItemsData';
import { timeToDisplayItems } from '@utils/getItemsData';

import { BrandFilterProps } from '../brand';

import * as Styled from './styled';

export function SizeFilter({
  textContent,
  searchBy,
  filterOf = 'size',
  _timeToDisplayItems = false,
  setTimeToDisplayItems,
  setItems,
}: BrandFilterProps): JSX.Element {
  return (
    <Styled.SizeOption
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
    </Styled.SizeOption>
  );
}
