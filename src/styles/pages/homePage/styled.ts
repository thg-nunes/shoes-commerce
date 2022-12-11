import styled from 'styled-components';

export const Container = styled.main`
  display: flex;
  gap: 1rem;
`;

export const FilterSection = styled.section`
  width: 15%;
  padding: 0 0.5rem;

  span {
    width: 100%;
    display: inline-block;

    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

export const BrandFilters = styled.section`
  p {
    font-weight: 600;
  }

  li {
    list-style: none;
    line-height: 2rem;
    cursor: pointer;
    padding-left: 0.9rem;
    transition: all 250ms ease-in-out;

    :hover {
      background: ${({ theme }) => theme.colors.gray[400]};
    }
  }
`;

export const SizeFilters = styled(BrandFilters)`
  li {
    padding-left: 0;
    font-size: 0.75rem;
  }

  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const ColorFilters = styled(BrandFilters)`
  ul {
    padding: 0.2rem;
    padding-left: 0.9rem;

    display: grid;
    grid-gap: 0.5rem 0;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-radius: 2px;

    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;
