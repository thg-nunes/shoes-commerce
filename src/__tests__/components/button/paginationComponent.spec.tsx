import { PaginationButton } from '@components/button/paginationComponent';
import { renderTheme } from '@styles/render-theme';
import { fireEvent, screen } from '@testing-library/react';

describe('<PaginationButton />', () => {
  const onPageChangeMock = jest.fn();

  it('ensures that button have correctly style on click', () => {
    renderTheme(
      <PaginationButton
        number={2}
        onPageChange={onPageChangeMock}
        isCurrent={false}
      />
    );

    const paginationButton = screen.getByRole('button', { name: '2' });

    fireEvent.click(paginationButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2);
    expect(paginationButton).toHaveStyle('background: #7160C3');
  });

  it('ensures that button have correctly style if isCurrent equal true', () => {
    renderTheme(
      <PaginationButton number={2} onPageChange={onPageChangeMock} isCurrent />
    );

    const paginationButton = screen.getByRole('button', { name: '2' });

    fireEvent.click(paginationButton);

    expect(onPageChangeMock).not.toHaveBeenCalled();
    expect(paginationButton).toHaveStyle('background: #7b2cbf');
  });
});
