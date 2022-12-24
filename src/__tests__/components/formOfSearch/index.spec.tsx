import React, { useState } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { useItemsBySearchContext } from '@contexts/itemsBySearchForm';
import { searchItemByFormText } from '@utils/getItemsData';

import { ShoeSearchForm } from '@components/shoeSearchForm';
import { renderTheme } from '@styles/render-theme';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
  };
});
jest.mock('@contexts/itemsBySearchForm', () => {
  return {
    useItemsBySearchContext: jest.fn(),
  };
});
jest.mock('@utils/getItemsData', () => {
  return {
    searchItem: jest.fn(),
    searchByPrice: jest.fn(),
    searchItemById: jest.fn(),
    timeToDisplayItems: jest.fn(),
    searchItemByFormText: jest.fn(),
    getItemQuantityInList: jest.fn(),
    useReturnTotalPriceOfItems: jest.fn(),
  };
});
const useStateMock = useState as jest.Mock;
const useItemsBySearchContextMock = useItemsBySearchContext as jest.Mock;
const searchItemByFormTextMock = searchItemByFormText as jest.Mock;

describe('<ShoeSearchForm />', () => {
  const initialInputValue = '';
  const setInputValue = jest.fn();
  const itemsBySearchFormResponse = [
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
      price: 139.9,
    },
  ];

  const itemsBySearchFormInitialValue = [];
  const setItemsBySearchForm = jest.fn();

  beforeEach(() => {
    useStateMock.mockReturnValue([initialInputValue, setInputValue]);
    searchItemByFormTextMock.mockResolvedValueOnce({
      status: 'success',
      items: itemsBySearchFormResponse,
    });
    useItemsBySearchContextMock.mockReturnValue({
      itemsBySearch: itemsBySearchFormInitialValue,
      setItemsBySearch: setItemsBySearchForm,
    });
  });

  it('ensures that the form performs the function correctly', async () => {
    renderTheme(<ShoeSearchForm />);

    expect(useStateMock).toHaveBeenCalled();

    const inputForm = screen.getByPlaceholderText('Pesquisar...');
    const form = inputForm.parentElement;

    expect(form).toBeInTheDocument();
    expect(inputForm).toHaveValue(initialInputValue);

    fireEvent.change(inputForm, {
      target: {
        value: 'Nike preto',
      },
    });

    expect(setInputValue).toHaveBeenCalledWith('Nike preto');

    useStateMock.mockReturnValueOnce(['Nike preto', setInputValue]);

    renderTheme(<ShoeSearchForm />);

    const [_, inputFormWithVale] =
      screen.getAllByPlaceholderText('Pesquisar...');

    fireEvent.submit(inputFormWithVale.parentElement);

    expect(searchItemByFormTextMock).toHaveBeenCalled();

    await waitFor(() =>
      expect(setItemsBySearchForm).toHaveBeenCalledWith(
        itemsBySearchFormResponse
      )
    );
  });
});
