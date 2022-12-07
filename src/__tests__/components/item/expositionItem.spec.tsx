import React, { useState } from 'react';
import { fireEvent, screen } from '@testing-library/react';

import { ExpositionItem } from '@components/item/exposition';
import { renderTheme } from '@styles/render-theme';
import { useCartContext } from '@contexts/shoppingCart/cart';

jest.mock('react', () => {
  return {
    ...jest.requireActual('react'),
    useState: jest.fn(),
  };
});
jest.mock('@contexts/shoppingCart/cart', () => {
  return {
    ...jest.requireActual('@contexts/shoppingCart/cart'),
    useCartContext: jest.fn(),
  };
});
const useCartContextMock = useCartContext as jest.Mock;
const useStateMock = useState as jest.Mock;

describe('<Item />', () => {
  const addItemMock = jest.fn();
  const initialCartState = [];
  const setStateCart = jest.fn().mockName('setStateCart');

  beforeEach(() => {
    useCartContextMock.mockReturnValue({
      addItem: addItemMock,
    });
    useStateMock.mockReturnValueOnce([initialCartState, setStateCart]);
  });

  it('should render item exposition correctly', () => {
    renderTheme(
      <ExpositionItem
        title="tênis de caminhada"
        price={150}
        src="/shoes.png"
        id="1"
      />
    );

    const shoesImage = screen.getByAltText('shoes');
    const title = screen.getByText(/tênis/gi);
    const price = screen.getByText((content, element) => {
      return content.startsWith('R$');
    });
    const button = screen.getByRole('button');

    expect(shoesImage).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });

  it('ensures item is add in list items than click in the button', () => {
    renderTheme(
      <ExpositionItem
        title="tênis de caminhada"
        price={150}
        src="/shoes.png"
        id="1"
      />
    );

    const button = screen.getByRole('button');

    fireEvent.click(button);

    expect(addItemMock).toHaveBeenCalled();
  });
});
