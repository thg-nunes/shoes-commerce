import { Item } from '@components/item';
import { renderTheme } from '@styles/render-theme';
import { screen } from '@testing-library/react';

describe('<Item />', () => {
  it('should ', () => {
    renderTheme(
      <Item
        size={35}
        title="tênis de caminhada"
        brand="Nike"
        price={150}
        stock={12}
      />
    );

    const shoesImage = screen.getByAltText('shoes');
    const size = screen.getByText(/tamanho/gi);
    const title = screen.getByText(/tênis/gi);
    const brand = screen.getByText(/marca/gi);
    const stock = screen.getByText(/estoque/gi);
    const price = screen.getByText((content, element) => {
      return content.startsWith('R$');
    });
    const button = screen.getByRole('button');

    expect(shoesImage).toBeInTheDocument();
    expect(size).toBeInTheDocument();
    expect(stock).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
