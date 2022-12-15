import { searchItem } from '@utils/searchItem';
import { timeToDisplayItems } from '@utils/setTimeToDisplayItems';

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
