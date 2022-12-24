import { useState } from 'react';

import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';

import { searchByPrice } from '@utils/getItemsData';

import { Button } from '@components/button/paginationComponent/styled';

import * as Styled from './styled';

export function FormSearchByPrice(): JSX.Element {
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);
  const { setItemsBySearch } = useItemsBySearchContext();

  return (
    <Styled.Container>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const { items } = await searchByPrice({ lowestPrice, highestPrice });

          setItemsBySearch(items);
        }}
      >
        <label htmlFor="lowestPrice">
          de:
          <input
            type="text"
            id="lowestPrice"
            name="lowestPrice"
            placeholder={lowestPrice !== 0 ? String(lowestPrice) : 'de'}
            value={lowestPrice}
            onChange={(e) => setLowestPrice(Number(e.target.value))}
          />
        </label>
        <label htmlFor="biggestPrice">
          até:
          <input
            type="text"
            id="biggestPrice"
            name="biggestPrice"
            placeholder={lowestPrice !== 0 ? String(highestPrice) : 'até'}
            value={highestPrice}
            onChange={(e) => setHighestPrice(Number(e.target.value))}
          />
        </label>
        <Button type="submit">Pesquisar</Button>
      </form>
    </Styled.Container>
  );
}
