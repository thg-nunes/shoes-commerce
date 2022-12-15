import { searchItem } from '@utils/searchItem';
import { timeToDisplayItems } from '@utils/setTimeToDisplayItems';

import { DefaultFilterProps } from '../default';

import * as Styled from './styled';

export function SizeFilter({
  textContent,
  searchBy,
  filterOf = 'size',
  _timeToDisplayItems = false,
  setTimeToDisplayItems,
  setItems,
}: DefaultFilterProps): JSX.Element {
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
