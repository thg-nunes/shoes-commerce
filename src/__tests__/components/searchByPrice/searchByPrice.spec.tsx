import React, { useState } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';

import { searchByPrice } from '@utils/getItemsData';

import { FormSearchByPrice } from '@components/searchByPrice';

import { renderTheme } from '@styles/render-theme';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
  };
});
jest.mock('@utils/getItemsData', () => {
  return {
    ...jest.requireActual('@utils/getItemsData'),
    searchByPrice: jest.fn(),
  };
});
jest.mock('@contexts/itemsBySearchForm', () => {
  return {
    useItemsBySearchContext: jest.fn(),
  };
});
const useStateMock = useState as jest.Mock;
const searchByPriceMock = searchByPrice as jest.Mock;
const useItemsBySearchContextMock = useItemsBySearchContext as jest.Mock;

describe('<FormSearchByPrice />', () => {
  const lowestPrice = 0;
  const highestPrice = 0;
  const setLowestPrice = jest.fn();
  const setHighestPrice = jest.fn();
  const setItemsBySearchMock = jest.fn();
  const searchByPriceResponse = [
    {
      id: 'ca19c56-86c2-40f2-b2ff-91d82d337600',
      brand: 'Nike',
      title: 'Tênis Nike Caminhada Confortável Detalhes Couro Masculino Preto.',
      description:
        'Tênis Nike Caminhada Confortável Detalhes Couro Masculino Preto, esse é o top de vendas, possui boa qualidade e acabamento e também uma boa longividade de vida util.',
      image:
        'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
      size: 29,
      color: 'black',
      stockQuantityQuantity: 9,
      price: 189.9,
    },
  ];

  beforeEach(() => {
    useStateMock
      .mockReturnValueOnce([lowestPrice, setLowestPrice])
      .mockReturnValueOnce([highestPrice, setHighestPrice]);

    searchByPriceMock.mockResolvedValue({
      status: 'success',
      items: searchByPriceResponse,
    });

    useItemsBySearchContextMock.mockReturnValue({
      itemsBySearch: [],
      setItemsBySearch: setItemsBySearchMock,
    });
  });

  it('ensures that form to search item by price execute correctly', async () => {
    renderTheme(<FormSearchByPrice />);

    const inputLowestPrice = screen.getByPlaceholderText('de');
    const inputBiggestPrice = screen.getByPlaceholderText('até');

    expect(inputLowestPrice).toBeInTheDocument();
    expect(inputBiggestPrice).toBeInTheDocument();
    expect(inputLowestPrice).toHaveValue(String(lowestPrice));
    expect(inputBiggestPrice).toHaveValue(String(highestPrice));

    fireEvent.change(inputLowestPrice, {
      target: {
        value: 150,
      },
    });

    expect(setLowestPrice).toHaveBeenCalledWith(150);

    fireEvent.change(inputBiggestPrice, {
      target: {
        value: 300,
      },
    });

    expect(setHighestPrice).toHaveBeenCalledWith(300);

    useStateMock
      .mockReturnValueOnce([150, setLowestPrice])
      .mockReturnValueOnce([300, setHighestPrice]);

    renderTheme(<FormSearchByPrice />);

    const input_lowestPrice = screen.getByPlaceholderText('150');
    const input_biggestPrice = screen.getByPlaceholderText('300');

    expect(input_lowestPrice).toBeInTheDocument();
    expect(input_biggestPrice).toBeInTheDocument();

    fireEvent.submit(input_lowestPrice.parentElement);

    await waitFor(() =>
      expect(searchByPriceMock).toHaveBeenCalledWith({
        lowestPrice: 150,
        highestPrice: 300,
      })
    );

    await waitFor(() =>
      expect(setItemsBySearchMock).toHaveBeenCalledWith(searchByPriceResponse)
    );
  });
});
