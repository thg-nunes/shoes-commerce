import { renderHook } from '@testing-library/react-hooks';

import { CartProvider, useCartContext } from '@contexts/shoppingCart/cart';

describe('contexts/shoppingCart', () => {
  it('should CartProvider context provider correctly datas', () => {
    const { result } = renderHook(useCartContext, {
      wrapper: CartProvider,
    });

    expect(result.current).toHaveProperty('items');
    expect(result.current).toHaveProperty('addItem');
    expect(result.current).toHaveProperty('removeItem');
    expect(result.current).toHaveProperty('deleteItem');
  });
});
