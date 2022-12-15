import { fireEvent, screen, waitFor } from '@testing-library/react';

import { searchItem } from '@utils/searchItem';
import { ColorFilter } from '@components/filters/color';

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
          size: 'any size',
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
  it('ensures that the request to get items from filter select is execute correctly', async () => {
    const setItems = jest.fn();

    renderTheme(
      <ColorFilter
        _timeToDisplayItems={false}
        setTimeToDisplayItems={jest.fn()}
        filterOf="color"
        searchBy="red"
        textContent="Vermelho"
        setItems={setItems}
      />
    );

    const optionColor = screen.getByText((content, element) => {
      return content.startsWith('Vermelho');
    });

    expect(optionColor).toBeInTheDocument();

    fireEvent.click(optionColor);

    await waitFor(() =>
      expect(searchItemMock).toHaveBeenCalledWith({
        searchBy: 'red',
        filterOf: 'color',
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
          size: 'any size',
          stock: 5,
          color: 'red',
          price: 10,
        },
      ])
    );
  });
});
