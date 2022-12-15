import { searchItem } from '@utils/getItemsData';
import { timeToDisplayItems } from '@utils/getItemsData';

import { DefaultFilterProps } from '../default';

import * as Styled from './styled';

export function ColorFilter({
  searchBy,
  textContent,
  filterOf = 'color',
  _timeToDisplayItems = false,
  setTimeToDisplayItems,
  setItems,
}: DefaultFilterProps): JSX.Element {
  return (
    <Styled.ColorOption
      onClick={async () => {
        const response = await searchItem({ searchBy, filterOf });
        timeToDisplayItems({
          _timeToDisplayItems,
          setTimeToDisplay: setTimeToDisplayItems,
        });
        setItems(response.items);
      }}
    >
      {textContent}
    </Styled.ColorOption>
  );
}
