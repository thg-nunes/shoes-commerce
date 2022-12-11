import { fireEvent, screen, waitFor } from '@testing-library/react';

import { searchItem } from '@utils/searchItem';

import { DefaultFilter } from '@components/filters/default';

import { renderTheme } from '@styles/render-theme';

jest.mock('@utils/searchItem', () => {
  return {
    searchItem: jest.fn().mockResolvedValue({
      status: 'success',
      items: [
        {
          id: '1',
          brand: 'Nike',
          title: 'any title',
          description: 'any description',
          image: 'any image',
          size: 36,
          stock: 5,
          color: 'red',
          price: 10,
        },
      ],
    }),
  };
});

const searchItemMock = searchItem as jest.Mock;

describe('', () => {
  it('ensures that the request to get items from filter default select is execute correctly', async () => {
    const setItems = jest.fn();

    renderTheme(
      <DefaultFilter filterOf="brand" textFilter="Nike" setItems={setItems} />
    );

    const optionColor = screen.getByRole('listitem');

    expect(optionColor).toBeInTheDocument();

    fireEvent.click(optionColor);

    await waitFor(() =>
      expect(searchItemMock).toHaveBeenCalledWith({
        searchBy: 'Nike',
        filterOf: 'brand',
      })
    );
    await waitFor(() =>
      expect(setItems).toHaveBeenCalledWith([
        {
          id: '1',
          brand: 'Nike',
          title: 'any title',
          description: 'any description',
          image: 'any image',
          size: 36,
          stock: 5,
          color: 'red',
          price: 10,
        },
      ])
    );
  });
});