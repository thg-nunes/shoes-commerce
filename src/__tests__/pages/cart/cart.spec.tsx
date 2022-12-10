import React, { useEffect, useState } from 'react';

import Cart from '@pages/cart';

import { searchItemById } from '@utils/searchItemById';

import { renderTheme } from '@styles/render-theme';
import { screen, waitFor } from '@testing-library/react';

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
jest.mock('@utils/searchItemById', () => {
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
  };
});

const useEffectMock = useEffect as jest.Mock;
const useStateMock = useState as jest.Mock;
const searchItemByIdMock = searchItemById as jest.Mock;

describe('Cart Page', () => {
  const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
  const setItemsStateMock = jest.fn().mockName('setItemsState');

  beforeEach(() => {
    getItemSpy.mockReturnValue(
      JSON.stringify([
        { id: 'ca19c56-86c2-40f2-b2ff-91d82d337600', quantity: 1 },
        { id: 'ca13-8c2-40f2-b2ff-91d837600', quantity: 3 },
      ])
    );

    useStateMock.mockReturnValue([[], setItemsStateMock]);
  });

  it('ensures that all cart items is render correctly', async () => {
    const [itemsById, setItemsById] = useStateMock();
    const itemsResponseApi = [
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

    const { rerender } = renderTheme(<Cart />);

    expect(useEffectMock).toHaveBeenCalled();
    expect(getItemSpy).toHaveBeenCalledWith('user@listItems');
    expect(searchItemByIdMock).toHaveBeenCalledWith({
      id: [
        'ca19c56-86c2-40f2-b2ff-91d82d337600',
        'ca13-8c2-40f2-b2ff-91d837600',
      ],
    });

    await waitFor(() =>
      expect(setItemsById).toHaveBeenCalledWith(itemsResponseApi)
    );

    useStateMock.mockReturnValueOnce([itemsResponseApi, setItemsStateMock]);

    rerender(<Cart />);

    const itemsTable = screen.getByRole('table');
    const imagesOfTheItemsTable = screen.getAllByAltText('shoes');

    expect(itemsTable).toBeInTheDocument();
    expect(imagesOfTheItemsTable.length).toBe(2);
  });
});
