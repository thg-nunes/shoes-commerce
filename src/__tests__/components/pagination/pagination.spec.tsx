import { Pagination } from '@components/pagination';

import { renderTheme } from '@styles/render-theme';
import { fireEvent, screen } from '@testing-library/react';

describe('<Pagination />', () => {
  const setPageMock = jest.fn();

  it('should render button go back first page', () => {
    renderTheme(
      <Pagination pageActive={4} setPage={setPageMock} totalPage={10} />
    );

    const buttonToFirstPage = screen.getByRole('button', {
      name: '1',
    });

    expect(buttonToFirstPage).toBeInTheDocument();

    fireEvent.click(buttonToFirstPage);

    expect(setPageMock).toHaveBeenCalledWith(1);
  });

  it('should not render button go back first page', () => {
    renderTheme(
      <Pagination pageActive={3} setPage={setPageMock} totalPage={10} />
    );

    expect(
      screen.queryByRole('button', {
        name: '1',
      })
    ).not.toBeInTheDocument();
  });

  it('should render button to last page', () => {
    renderTheme(
      <Pagination pageActive={2} setPage={setPageMock} totalPage={6} />
    );

    const buttonToLastPage = screen.getByRole('button', {
      name: '6',
    });

    expect(
      screen.getByRole('button', {
        name: '6',
      })
    ).toBeInTheDocument();

    fireEvent.click(buttonToLastPage);

    expect(setPageMock).toHaveBeenCalledWith(6);
  });

  it('should not render button to last page', () => {
    renderTheme(
      <Pagination pageActive={2} setPage={setPageMock} totalPage={4} />
    );

    expect(
      screen.queryByRole('button', {
        name: '4',
      })
    ).not.toBeInTheDocument();
  });
});
