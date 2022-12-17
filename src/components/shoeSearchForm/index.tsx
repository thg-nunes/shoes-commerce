import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';
import { searchItemByFormText } from '@utils/getItemsData';
import { FormEvent, useState } from 'react';
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
    </Styled.Container>
  );
}
