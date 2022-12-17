import { renderHook } from '@testing-library/react-hooks';

import {
  ItemsBySearchProvider,
  useItemsBySearchContext,
} from '@contexts/itemsBySearchForm';
import { useState } from 'react';
import { act } from '@testing-library/react';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
  };
});
const useStateMock = useState as jest.Mock;

describe('contexts/itemsBySearchForm', () => {
  const initialItemsBySearchForm = [];
  const setItemsBySearchForm = jest.fn();

  beforeEach(() => {
    useStateMock.mockReturnValueOnce([
      initialItemsBySearchForm,
      setItemsBySearchForm,
    ]);
  });

  it('ensures that itemsBySearchFormProvider execute correctly', () => {
    const { result, rerender } = renderHook(useItemsBySearchContext, {
      wrapper: ItemsBySearchProvider,
    });

    expect(result.current.itemsBySearch).toEqual(initialItemsBySearchForm);

    act(() =>
      result.current.setItemsBySearch([
        {
          id: '1',
          brand: 'any brand',
          title: 'any title',
          description: 'any description',
          image: 'any image',
          price: 'any price',
          size: 38,
          stock: 1,
        },
      ])
    );

    useStateMock.mockReturnValueOnce([
      [
        {
          id: '1',
          brand: 'any brand',
          title: 'any title',
          description: 'any description',
          image: 'any image',
          price: 'any price',
          size: 38,
          stock: 1,
        },
      ],
      setItemsBySearchForm,
    ]);

    rerender();

    expect(result.current.itemsBySearch).toEqual(
      expect.arrayContaining(initialItemsBySearchForm)
    );
  });
});
