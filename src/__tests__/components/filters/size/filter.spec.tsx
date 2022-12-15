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
      <SizeFilter
        _timeToDisplayItems={false}
        setTimeToDisplayItems={jest.fn()}
        filterOf="size"
        textContent="35"
        setItems={setItems}
        searchBy="35"
      />
    );

    const optionColor = screen.getByText((content, element) => {
      return content.startsWith('35');
    });

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
