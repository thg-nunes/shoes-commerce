import { renderTheme } from '@styles/render-theme';
import { ItemsExposition } from '@templates/itemsExposiotion';
import { screen } from '@testing-library/react';

describe('<ItemsExposition />', () => {
  const itemsList = [
    {
      id: '1',
      brand: 'any brand',
      title: 'any title',
      description: 'any description',
      image: 'any image',
      size: 35,
      stock: 12,
      price: 150,
    },
    {
      id: '2',
      brand: 'any brand',
      title: 'any title',
      description: 'any description',
      image: 'any image',
      size: 26,
      stock: 156,
      price: 110,
    },
  ];

  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify([
        {
          id: '1',
          quantity: 3,
        },
        {
          id: '2',
          quantity: 2,
        },
        {
          id: '3',
          quantity: 1,
        },
      ])
    );
  });

  it('ensures that items exposition render correctly item quantity', () => {
    renderTheme(<ItemsExposition itemsList={itemsList} />);

    const allPrices = screen.getAllByText(/R\$/gi);

    expect(allPrices.length).toBe(2);
  });
});
