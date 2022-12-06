import { screen } from '@testing-library/react';

import { ExpositionItem } from '@components/item/exposition';
import { renderTheme } from '@styles/render-theme';

describe('<Item />', () => {
  it('should render item exposition correctly', () => {
    renderTheme(
      <ExpositionItem title="tênis de caminhada" price={150} src="/shoes.png" />
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
});
