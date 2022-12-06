import { useState } from 'react';
import { toast } from 'react-toastify';
import AxiosMock from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { api } from '@services/axios';
import { CartProvider, useCartContext } from '@contexts/shoppingCart/cart';

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
jest.mock('react-toastify');
const toastError = toast.error as jest.Mock;

const apiMock = new AxiosMock(api);
const useStateMock = useState as jest.Mock;

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

    useStateMock.mockReturnValue([[], setItemsCart]).mockName('useState');
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

  it('should update item quantity if item to add already exists', async () => {
    const existingProduct = { id: '1', quantity: 1 };

    useStateMock
      .mockReturnValueOnce([[existingProduct], setItemsCart])
      .mockName('useState');

    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await act(() => result.current.addItem(existingProduct.id));

    await waitFor(() =>
      expect(result.current.items).toEqual(
        expect.arrayContaining([
          {
            ...existingProduct,
            quantity: 2,
          },
        ])
      )
    );
  });

  it('should call toast.error if product in stock is equal than 0', async () => {
    apiMock.onGet(`/item/${itemId}`).reply(200, {
      statusbar: 'success',
      items: [
        {
          id: '1',
          name: 'fake name',
          description: 'fake description',
          price: 18,
          stockQuantity: 0,
          brand: 'fake brand',
        },
      ],
    });

    const toastMessage = 'Quantidade em estoque insuficiente';
    const toastCloseIn = { autoClose: 3000 };
    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await act(() => result.current.addItem('1'));

    expect(toastError).toHaveBeenCalledWith(toastMessage, toastCloseIn);
    expect(result.current.items.length).toBe(0);
  });
});
