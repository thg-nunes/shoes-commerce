import { searchItemByFormText } from '@utils/getItemsData';
import { FormEvent, useState } from 'react';
import * as Styled from './styled';

export type ShoeSearchFormProps = {};

export function ShoeSearchForm(): JSX.Element {
  const [initialInputValue, setInputValue] = useState('');

  return (
    <Styled.Container
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();

        await searchItemByFormText({ searchValue: initialInputValue });
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
