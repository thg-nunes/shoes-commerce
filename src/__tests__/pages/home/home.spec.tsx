import AxiosMock from 'axios-mock-adapter';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

import { api } from '@services/axios';

import { useCartContext } from '@contexts/shoppingCart/cart';

import Home from '@pages/index';
import { theme } from '@styles/theme';
import { renderTheme } from '@styles/render-theme';
import { ThemeProvider } from 'styled-components';

const apiMock = new AxiosMock(api);

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useEffect: jest.fn().mockImplementation((callback) => callback()),
    useState: jest.fn(),
  };
});
jest.mock('@contexts/shoppingCart/cart', () => {
  return {
    useCartContext: jest.fn().mockReturnValue({
      addItem: jest.fn(),
      items: [],
    }),
  };
});

const useEffectMock = useEffect as jest.Mock;
const useStateMock = useState as jest.Mock;
const useCartContextMock = useCartContext as jest.Mock;

describe('<Home /> | Test E2E of home page', () => {
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const responseApi = [
    {
      id: 'ca13-8c2-40f2-b2ff-91d837600',
      brand: 'Adidas',
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino.',
      description:
        'Tênis VR Caminhada Confortável Detalhes Couro Masculino, esse é o top de vendas, possui boa qualidade e acabamento e também uma boa longividade de vida util.',
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg',
      size: 35,
      color: 'green',
      stockQuantityQuantity: 9,
      price: 139.9,
    },
    {
      id: 'ca19c56-86c2-40f2-b2ff-91d82d337600',
      brand: 'Vans',
      title: 'Tênis VR Caminhada Confortável Detalhes Couro Masculino.',
      description:
        'Tênis VR Caminhada Confortável Detalhes Couro Masculino, esse é o top de vendas, possui boa qualidade e acabamento e também uma boa longividade de vida util.',
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
      size: 29,
      color: 'blue',
      stockQuantityQuantity: 9,
      price: 139.9,
    },
  ];

  const setItemsMock = jest.fn().mockName('setItems');
  const addItemMock = jest.fn().mockName('addItem');

  beforeEach(() => {
    apiMock.onGet(`/api/items/all`).reply(200, {
      status: 'success',
      items: {
        data: responseApi,
      },
    });

    useStateMock.mockReturnValueOnce([[], setItemsMock]);

    useCartContextMock.mockReturnValueOnce({
      addItem: addItemMock,
      items: [],
    });
  });

  it('ensures that home page execute the functions correct and render correctly', async () => {
    renderTheme(<Home />);

    expect(useEffectMock).toHaveBeenCalled();

    await waitFor(() => expect(setItemsMock).toHaveBeenCalledWith(responseApi));

    useStateMock.mockReturnValue([responseApi, setItemsMock]);

    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );

    const itemsContainer = await screen.findByRole('main');
    const itemsImages = await screen.findAllByAltText('shoes');
    const buttonsToAddItemInList = await screen.findAllByText(
      (container, element) => {
        return (
          container.startsWith('adicionar') &&
          element.tagName.toLowerCase() === 'button'
        );
      }
    );

    await waitFor(() => expect(itemsContainer).toBeInTheDocument());

    expect(itemsImages.length).toBe(2);

    fireEvent.click(buttonsToAddItemInList[0]);

    expect(addItemMock).toHaveBeenCalledWith(responseApi[0].id);

    getItemSpy.mockReturnValue(
      JSON.stringify([{ id: responseApi[0].id, quantity: 1 }])
    );

    useCartContextMock.mockReturnValue({
      addItem: addItemMock,
      items: [{ id: responseApi[0].id, quantity: 1 }],
    });

    render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    );

    const spansItemsQuantity = await screen.findAllByText(
      (container, element) => {
        return (
          element.tagName.toLowerCase() === 'span' &&
          element.textContent === '1'
        );
      }
    );

    expect(spansItemsQuantity.length).toBe(1);
    expect(spansItemsQuantity[0]).toBeInTheDocument();
  });
});
