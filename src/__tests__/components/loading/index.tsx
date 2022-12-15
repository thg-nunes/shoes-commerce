import { Loading } from '@components/loading';
import { renderTheme } from '@styles/render-theme';
import { screen } from '@testing-library/react';

describe('<Loading />', () => {
  it('ensures that the loading component render correctly', () => {
    renderTheme(<Loading />);

    const loading = screen.getByText((content, element) => {
      return element.tagName.toLowerCase() === 'span';
    });

    expect(loading).toBeInTheDocument();
  });
});
