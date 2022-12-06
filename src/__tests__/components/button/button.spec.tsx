import { fireEvent, screen } from '@testing-library/react';

import { Button } from '@components/button/addItem';

import { renderTheme } from '@styles/render-theme';

describe('<Button />', () => {
  const textButton = 'adicionar ao carrinho';
  const actionOnClick = jest.fn().mockName('actionOnClick');

  it('', () => {
    renderTheme(
      <Button textButton={textButton} actionOnClick={actionOnClick} />
    );

    const button = screen.getByText(textButton);
    const cartIcon = screen.getByText((content, element) => {
      return element.hasAttribute('name');
    });

    expect(cartIcon).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    expect(actionOnClick).toHaveBeenCalled();
  });
});
