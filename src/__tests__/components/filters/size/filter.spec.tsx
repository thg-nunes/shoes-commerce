import { fireEvent, screen, waitFor } from '@testing-library/react';

import { searchItem } from '@utils/searchItem';
import { SizeFilter } from '@components/filters/size';

import { renderTheme } from '@styles/render-theme';

jest.mock('@utils/searchItem', () => {
  return {
    searchItem: jest.fn().mockResolvedValue({
      status: 'success',
      items: [
        {
          id: '1',
          brand: 'any brand',
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
  it('ensures that the request to get items from filter size select is execute correctly', async () => {
    const setItems = jest.fn();

    renderTheme(
      <SizeFilter filterOf="size" textFilter="35" setItems={setItems} />
    );

    const optionColor = screen.getByRole('button');

    expect(optionColor).toBeInTheDocument();

    fireEvent.click(optionColor);

    await waitFor(() =>
      expect(searchItemMock).toHaveBeenCalledWith({
        searchBy: '35',
        filterOf: 'size',
      })
    );
    await waitFor(() =>
      expect(setItems).toHaveBeenCalledWith([
        {
          id: '1',
          brand: 'any brand',
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
