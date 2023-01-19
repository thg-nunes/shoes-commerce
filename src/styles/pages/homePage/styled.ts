import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;
  margin-bottom: 2rem;

  display: grid;
  grid-gap: 1rem;

  @media (max-width: 1366px) {
    width: 95%;
  }
`;

export const FilterSection = styled.section`
  width: 100%;
  display: flex;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.pink[700]};
  z-index: 1;

  span {
    width: max-content;
    display: inline-block;

    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
  }

  > div {
    display: flex;
  }
`;

export const BrandFilters = styled.section`
  width: 7rem;
  position: relative;

  p {
    font-weight: 600;
    line-height: 2rem;
    text-align: center;
    cursor: pointer;
    transition: all 250ms ease-in-out;

    :hover {
      background: ${({ theme }) => theme.colors.pink[400]};
    }
  }

  ul {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;

    display: grid;
    grid-template-rows: 1fr;
    background: ${({ theme }) => theme.colors.pink[700]};
    z-index: 1;

    li {
      height: 2rem;
      line-height: 2rem;

      list-style: none;
      text-align: center;
      cursor: pointer;

      :hover {
        background: ${({ theme }) => theme.colors.pink[400]};
      }
    }
  }

  :hover {
    ul {
      height: auto;
    }
  }
`;

export const SizeFilters = styled(BrandFilters)``;

export const ColorFilters = styled(BrandFilters)``;

export const FormSearchByPrice = styled(BrandFilters)`
  :hover {
    form {
      height: auto;

      border-top: 1px solid ${({ theme }) => theme.colors.gray[250]};

      padding: 1rem;
    }
  }
`;
