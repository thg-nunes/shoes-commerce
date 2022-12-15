import React, { useEffect, useState } from 'react';

import Cart from '@pages/cart';

import {
  searchItemById,
  useReturnTotalPriceOfItems,
} from '@utils/getItemsData';

import { renderTheme } from '@styles/render-theme';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { useCartContext } from '@contexts/shoppingCart/cart';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useEffect: jest
      .fn()
      .mockImplementation((callback) => callback())
      .mockName('useEffect'),
    useState: jest.fn(),
  };
});
jest.mock('@utils/getItemsData', () => {
  return {
    searchItemById: jest.fn().mockResolvedValue({
      status: 'success',
      items: [
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
      ],
    }),
    useReturnTotalPriceOfItems: jest.fn(),
  };
});
jest.mock('@contexts/shoppingCart/cart', () => {
  return {
    useCartContext: jest.fn().mockReturnValueOnce({
      items: [
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 3 },
      ],
    }),
  };
});

const useEffectMock = useEffect as jest.Mock;
const useStateMock = useState as jest.Mock;
const useCartContextMock = useCartContext as jest.Mock;
const searchItemByIdMock = searchItemById as jest.Mock;
const useReturnTotalPriceOfItemsMock = useReturnTotalPriceOfItems as jest.Mock;

describe('<Cart /> | Test E2E of cart page', () => {
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const setItemsDataMock = jest.fn().mockName('setItemsData');
  const setItemsByIdMock = jest.fn().mockName('setItemsById');

  const addItemMock = jest.fn().mockName('addItem');
  const removeItemMock = jest.fn().mockName('removeItem');
  const deleteItemMock = jest.fn().mockName('deleteItem');

  beforeEach(() => {
    getItemSpy.mockReturnValue(
      JSON.stringify([
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 3 },
      ])
    );

    useStateMock
      .mockReturnValue([[], jest.fn()])
      .mockReturnValueOnce([[], setItemsDataMock])
      .mockReturnValueOnce([[], setItemsByIdMock]);

    useCartContextMock.mockReturnValueOnce({
      items: [
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 3 },
      ],
      addItem: addItemMock,
      removeItem: removeItemMock,
      deleteItem: deleteItemMock,
    });

    useReturnTotalPriceOfItemsMock.mockReturnValue('R$ 123,03');

    searchItemByIdMock.mockResolvedValueOnce({
      status: 'success',
      items: [
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
      ],
    });
  });

  it('ensures that cart page execute the functions correct and render correctly', async () => {
    const { rerender } = renderTheme(<Cart />);

    expect(useEffectMock).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalledWith('user@listItems');
    expect(searchItemByIdMock).toHaveBeenCalledWith({
      id: [
        'ca19c56-86c2-40f2-b2ff-91d82d337600',
        'ca13-8c2-40f2-b2ff-91d837600',
      ],
    });

    await waitFor(() => expect(setItemsByIdMock).toHaveBeenCalled());

    useStateMock
      .mockReturnValue([[], jest.fn()])
      .mockReturnValueOnce([[], setItemsDataMock])
      .mockReturnValueOnce([
        [
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
        ],
        setItemsByIdMock,
      ]);

    rerender(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    const itemsTable = screen.getByRole('table');
    const imagesOfTheItemsTable = screen.getAllByAltText('shoes');

    expect(itemsTable).toBeInTheDocument();
    expect(imagesOfTheItemsTable.length).toBe(2);

    const [RemoveQuantityItemIcon, AddQuantityItemIcon, DeleteItemIcon] =
      await screen.findAllByText((_, element) => {
        return element.hasAttribute('name');
      });

    fireEvent.click(RemoveQuantityItemIcon);

    expect(removeItemMock).toHaveBeenCalledWith('ca13-8c2-40f2-b2ff-91d837600');

    getItemSpy.mockReturnValue(
      JSON.stringify([
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 2 },
      ])
    );

    useCartContextMock.mockReturnValueOnce({
      items: [
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 2 },
      ],
      addItem: addItemMock,
      removeItem: removeItemMock,
      deleteItem: deleteItemMock,
    });

    useStateMock
      .mockReturnValue([[], jest.fn()])
      .mockReturnValueOnce([[], setItemsDataMock])
      .mockReturnValueOnce([
        [
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
        ],
        setItemsByIdMock,
      ]);

    rerender(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    const [firstItem, secoundItem] = await screen.findAllByText(
      (container, element) => {
        return (
          element.tagName.toLowerCase() === 'span' &&
          element.className === 'quantityItem'
        );
      }
    );

    expect(firstItem).toHaveTextContent('1');
    expect(secoundItem).toHaveTextContent('2');

    fireEvent.click(AddQuantityItemIcon);

    expect(addItemMock).toHaveBeenCalledWith('ca13-8c2-40f2-b2ff-91d837600');

    getItemSpy.mockReturnValue(
      JSON.stringify([
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 3 },
      ])
    );

    useCartContextMock.mockReturnValueOnce({
      items: [
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 3 },
      ],
      addItem: addItemMock,
      removeItem: removeItemMock,
      deleteItem: deleteItemMock,
    });

    useStateMock
      .mockReturnValue([[], jest.fn()])
      .mockReturnValueOnce([[], setItemsDataMock])
      .mockReturnValueOnce([
        [
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
        ],
        setItemsByIdMock,
      ]);

    rerender(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    const [_firstSpanItemQuantity] = await screen.findAllByText(
      (container, element) => {
        return element.tagName.toLowerCase() === 'span';
      }
    );

    expect(_firstSpanItemQuantity).toHaveTextContent('3');

    fireEvent.click(DeleteItemIcon);

    expect(deleteItemMock).toHaveBeenCalledWith('ca13-8c2-40f2-b2ff-91d837600');

    getItemSpy.mockReturnValue(
      JSON.stringify([
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
      ])
    );

    useCartContextMock.mockReturnValueOnce({
      items: [{ id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 }],
      addItem: addItemMock,
      removeItem: removeItemMock,
      deleteItem: deleteItemMock,
    });

    useStateMock
      .mockReturnValue([[], jest.fn()])
      .mockReturnValueOnce([[], setItemsDataMock])
      .mockReturnValueOnce([
        [
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
        ],
        setItemsByIdMock,
      ]);

    rerender(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    const itemsOfUserInteraction = await screen.findAllByText((_, element) => {
      return element.hasAttribute('name');
    });

    fireEvent.click(itemsOfUserInteraction[2]);

    expect(deleteItemMock).toHaveBeenCalledWith(
      'ca19c56-86c2-40f2-b2ff-91d82d337600'
    );

    getItemSpy.mockReturnValue(JSON.stringify([]));

    useCartContextMock.mockReturnValueOnce({
      items: [],
      addItem: addItemMock,
      removeItem: removeItemMock,
      deleteItem: deleteItemMock,
    });

    useStateMock
      .mockReturnValue([[], jest.fn()])
      .mockReturnValueOnce([[], setItemsDataMock])
      .mockReturnValueOnce([[], setItemsByIdMock]);

    rerender(
      <ThemeProvider theme={theme}>
        <Cart />
      </ThemeProvider>
    );

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });
});
