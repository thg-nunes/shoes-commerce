import React, { useState } from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { searchItemByFormText } from '@utils/getItemsData';

import { ShoeSearchForm } from '@components/shoeSearchForm';
import { renderTheme } from '@styles/render-theme';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
  };
});
jest.mock('@utils/getItemsData', () => {
  return {
    searchItem: jest.fn(),
    searchItemById: jest.fn(),
    timeToDisplayItems: jest.fn(),
    searchItemByFormText: jest.fn(),
    getItemQuantityInList: jest.fn(),
    useReturnTotalPriceOfItems: jest.fn(),
  };
});
const searchItemByFormTextMock = searchItemByFormText as jest.Mock;
const useStateMock = useState as jest.Mock;

describe('', () => {
  const initialInputValue = '';
  const setInputValue = jest.fn();

  beforeEach(() => {
    useStateMock.mockReturnValueOnce([initialInputValue, setInputValue]);
    searchItemByFormTextMock.mockResolvedValueOnce({
      status: 'success',
      items: {
        data: [
          {
            id: 'ca19c56-86c2-40f2-b2ff-91d82d337600',
            brand: 'Nike',
            title:
              'Tênis Nike Caminhada Confortável Detalhes Couro Masculino Preto.',
            description:
              'Tênis Nike Caminhada Confortável Detalhes Couro Masculino Preto, esse é o top de vendas, possui boa qualidade e acabamento e também uma boa longividade de vida util.',
            image:
              'https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis2.jpg',
            size: 29,
            color: 'black',
            stockQuantityQuantity: 9,
            price: 139.9,
          },
        ],
      },
    });
  });

  it('ensures that the form performs the function correctly', () => {
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

    fireEvent.submit(form);

    // testar função que faz a requisição com o valor digitado no input
  });
});
