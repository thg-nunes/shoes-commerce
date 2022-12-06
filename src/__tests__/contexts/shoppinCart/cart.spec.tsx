import { useState } from 'react';
import AxiosMock from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { api } from '@services/axios';
import { CartProvider, useCartContext } from '@contexts/shoppingCart/cart';

const apiMock = new AxiosMock(api);
const useStateMock = useState as jest.Mock;

jest.mock('react', () => {
  const originalModule = jest.requireActual('react');

  return {
    ...originalModule,
    useState: jest
      .fn()
      .mockReturnValueOnce([[], jest.fn().mockName('setItemsCart')])
      .mockName('useState'),
  };
});

describe('contexts/shoppingCart', () => {
  const itemId = '1';
  const initialCartState = [];
  const setItemsCart = jest.fn().mockName('setItemsCart');

  beforeEach(() => {
    apiMock.onGet(`/item/${itemId}`).reply(200, {
      statusbar: 'success',
      items: [
        {
          id: '1',
          name: 'fake name',
          description: 'fake description',
          price: 18,
          stockQuantity: 15,
          brand: 'fake brand',
        },
      ],
    });
  });

  it('should CartProvider context provider correctly datas', () => {
    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    expect(result.current).toHaveProperty('items');
    expect(result.current).toHaveProperty('addItem');
    expect(result.current).toHaveProperty('removeItem');
    expect(result.current).toHaveProperty('deleteItem');
  });

  it('shold add a item in list items', async () => {
    useStateMock
      .mockReturnValueOnce([initialCartState, setItemsCart])
      .mockName('useState');

    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await act(() => result.current.addItem(itemId));

    await waitFor(() => result.current.items.length);

    expect(setItemsCart).toHaveBeenCalledWith([
      ...initialCartState,
      {
        id: itemId,
        quantity: 1,
      },
    ]);
  });
});
