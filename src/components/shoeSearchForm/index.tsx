import { FormEvent, useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';
import { searchItemByFormText } from '@utils/getItemsData';
import * as Styled from './styled';

export function ShoeSearchForm(): JSX.Element {
  const [initialInputValue, setInputValue] = useState('');
  const { setItemsBySearch } = useItemsBySearchContext();

  return (
    <Styled.Container
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();

        const { items } = await searchItemByFormText({
          searchValue: initialInputValue,
        });

        setItemsBySearch(items);
      }}
    >
      <Styled.Input
        placeholder="Pesquisar..."
        value={initialInputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <BiSearchAlt fill="#1A1921" />
    </Styled.Container>
  );
}
