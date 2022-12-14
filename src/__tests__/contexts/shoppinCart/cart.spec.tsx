import AxiosMock from 'axios-mock-adapter';
import { useState } from 'react';
import { toast } from 'react-toastify';

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
const toastWarn = toast.warn as jest.Mock;
const toastInfo = toast.info as jest.Mock;

const apiMock = new AxiosMock(api);
const useStateMock = useState as jest.Mock;

describe('contexts/shoppingCart', () => {
  const itemId = '1';
  const initialCartState = [];
  const setItemsCart = jest.fn().mockName('setItemsCart');

  const storageSetItemSpy = jest.spyOn(Storage.prototype, 'setItem');

  beforeEach(() => {
    apiMock.onGet(`/api/item/${itemId}`).reply(200, {
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

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

    // usestate precisa iniciar com o valor salvo no localstorage
    useStateMock
      .mockReturnValue([initialCartState, setItemsCart])
      .mockName('useState');
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

  it('ensures that the initial state of the itmes is the localstorage value', () => {
    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    expect(result.current.items).toEqual([]);
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

  it('should list items is save in localstorage', async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await act(() => result.current.addItem(itemId));

    await waitFor(() => result.current.items.length);

    expect(storageSetItemSpy).toHaveBeenNthCalledWith(
      1,
      'user@listItems',
      JSON.stringify([
        ...initialCartState,
        {
          id: itemId,
          quantity: 1,
        },
      ])
    );
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
    apiMock.onGet(`/api/item/${itemId}`).reply(200, {
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

    expect(toastWarn).toHaveBeenCalledWith(toastMessage, toastCloseIn);
    expect(result.current.items.length).toBe(0);
  });

  it('should call toast.error if product quantity in the cart item is greater than stock quantity', async () => {
    const productQuantityGreaterThanStockQuantity = {
      id: '1',
      quantity: 15,
    };
    const toastMessage =
      'Quantidade no carrinho maior que estoque nosso estoque';
    const toastCloseIn = { autoClose: 3000 };

    useStateMock
      .mockReturnValue([
        [productQuantityGreaterThanStockQuantity],
        setItemsCart,
      ])
      .mockName('useState');

    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await act(() => result.current.addItem('1'));

    expect(result.current.items).toEqual(
      expect.arrayContaining([
        {
          id: '1',
          quantity: 15,
        },
      ])
    );

    expect(toastError).toHaveBeenCalledWith(toastMessage, toastCloseIn);
  });

  it('ensures that a unit is removed of the product and the new value is saved in the localstorage', async () => {
    useStateMock.mockReturnValueOnce([
      [{ id: '1', quantity: 4 }],
      setItemsCart,
    ]);

    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await waitFor(() => result.current.removeItem('1'));

    expect(setItemsCart).toHaveBeenCalledWith([{ id: '1', quantity: 3 }]);

    await waitFor(() =>
      expect(result.current.items).toEqual(
        expect.arrayContaining([{ id: '1', quantity: 3 }])
      )
    );

    expect(storageSetItemSpy).toHaveBeenCalledWith(
      'user@listItems',
      JSON.stringify([{ id: '1', quantity: 3 }])
    );
  });

  it('ensures that if item quantity less or equal than 0 toast.info is called and item is removed of the list', async () => {
    useStateMock.mockReturnValueOnce([
      [{ id: '1', quantity: 0 }],
      setItemsCart,
    ]);

    const { result, rerender } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await waitFor(() => result.current.removeItem('1'));

    expect(toastInfo).toHaveBeenCalledWith('Item removido do carrinho', {
      autoClose: 3000,
    });

    expect(setItemsCart).toHaveBeenCalledWith([]);

    rerender();

    expect(result.current.items).toEqual([]);
  });

  it('ensures that item is deleted, localstorage is updated and toast.warn is called', async () => {
    useStateMock.mockReturnValueOnce([
      [
        { id: '1', quantity: 3 },
        { id: '2', quantity: 4 },
        { id: '3', quantity: 2 },
      ],
      setItemsCart,
    ]);

    const { result, rerender } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    await waitFor(() => result.current.deleteItem('1'));

    expect(setItemsCart).toHaveBeenCalledWith([
      { id: '2', quantity: 4 },
      { id: '3', quantity: 2 },
    ]);

    expect(toastWarn).toHaveBeenCalledWith('Item deletado do carrinho', {
      autoClose: 3000,
    });

    expect(storageSetItemSpy).toHaveBeenCalledWith(
      'user@listItems',
      JSON.stringify([
        { id: '2', quantity: 4 },
        { id: '3', quantity: 2 },
      ])
    );

    useStateMock.mockReturnValueOnce([
      [
        { id: '2', quantity: 4 },
        { id: '3', quantity: 2 },
      ],
      setItemsCart,
    ]);

    rerender();

    await waitFor(() => result.current.deleteItem('2'));

    expect(result.current.items).toEqual(
      expect.arrayContaining([{ id: '3', quantity: 2 }])
    );
  });
});
