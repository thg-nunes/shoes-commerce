import React, { useState } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { searchByPrice } from '@utils/getItemsData';
import { renderTheme } from '@styles/render-theme';
import { FormSearchByPrice } from '@components/searchByPrice';

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
const useStateMock = useState as jest.Mock;
const searchByPriceMock = searchByPrice as jest.Mock;

describe('<FormSearchByPrice />', () => {
  const lowestPrice = 0;
  const highestPrice = 0;
  const setLowestPrice = jest.fn();
  const setHighestPrice = jest.fn();

  beforeEach(() => {
    useStateMock
      .mockReturnValueOnce([lowestPrice, setLowestPrice])
      .mockReturnValueOnce([highestPrice, setHighestPrice]);
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
  });
});
