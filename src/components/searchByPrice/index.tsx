import { searchByPrice } from '@utils/getItemsData';
import { useState } from 'react';
import * as Styled from './styled';

export function FormSearchByPrice(): JSX.Element {
  const [lowestPrice, setLowestPrice] = useState(0);
  const [highestPrice, setHighestPrice] = useState(0);

  return (
    <Styled.Container>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          searchByPrice({ lowestPrice, highestPrice });
        }}
      >
        <input
          type="text"
          name="lowestPrice"
          placeholder={lowestPrice !== 0 ? String(lowestPrice) : 'de'}
          value={lowestPrice}
          onChange={(e) => setLowestPrice(Number(e.target.value))}
        />
        <input
          type="text"
          name="biggestPrice"
          placeholder={lowestPrice !== 0 ? String(highestPrice) : 'até'}
          value={highestPrice}
          onChange={(e) => setHighestPrice(Number(e.target.value))}
        />
      </form>
    </Styled.Container>
  );
}
