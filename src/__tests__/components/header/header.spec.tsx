import React from 'react';
import { screen } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';

import { Header } from '@components/header';
import { renderTheme } from '@styles/render-theme';
import { CartProvider, useCartContext } from '@contexts/shoppingCart/cart';

jest.mock('@contexts/shoppingCart/cart', () => ({
  ...jest.requireActual('@contexts/shoppingCart/cart'),
  useCartContext: jest.fn(),
}));

const useCartContextMock = useCartContext as jest.Mock;

describe('<Header />', () => {
  const initialCartState = [];

  beforeEach(() => {
    useCartContextMock.mockReturnValueOnce({
      items: initialCartState,
    });
  });

  it('shold render commerce name and shoes icon', () => {
    renderTheme(<Header />);

    const [shoesIcon] = screen.getAllByText((content, element) => {
      return element.hasAttribute('name');
    });
    const commerceName = screen.getByText('COMMERCE-SHOES');

    expect(shoesIcon).toBeInTheDocument();
    expect(commerceName).toBeInTheDocument();
  });

  it('shold render shopping cart data in header component', () => {
    renderTheme(<Header />);

    const textCart = screen.getByText(/meu carrinho/gi);
    const itemsAmount = screen.getByText(/items/gi);
    const [_, bagIcon] = screen.getAllByText((content, element) => {
      return element.hasAttribute('name');
    });

    expect(itemsAmount).toBeInTheDocument();
    expect(textCart).toBeInTheDocument();
    expect(bagIcon).toBeInTheDocument();
  });

  it('should render the correct quantity of items in cart', () => {
    renderHook(useCartContextMock, {
      wrapper: CartProvider,
    });

    useCartContextMock.mockReturnValueOnce({
      items: initialCartState,
    });

    renderTheme(<Header />);

    expect(useCartContextMock).toHaveBeenCalled();

    const itemsTotalInCart = screen.getByText(
      `${initialCartState.length} items`
    );

    expect(itemsTotalInCart).toBeInTheDocument();

    useCartContextMock.mockReturnValueOnce({
      items: [1, 2],
    });

    renderTheme(<Header />);

    const itemsTotalInCartUpdate = screen.getByText(
      `${initialCartState.length} items`
    );

    expect(itemsTotalInCartUpdate).toBeInTheDocument();
  });
});
