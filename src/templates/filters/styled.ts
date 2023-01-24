import { Container } from '@components/searchByPrice/styled';

import styled from 'styled-components';

type FilterSectionProps = {
  menuMobileVisible: boolean;
};

export const FilterSection = styled.section<FilterSectionProps>`
  width: 100%;
  display: flex;
  gap: 1rem;

  background: ${({ theme }) => theme.colors.pink[700]};
  z-index: 1;

  span {
    position: relative;
    width: max-content;
    display: inline-block;

    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;

    ::after {
      content: ' |';

      @media (max-width: 540px) {
        content: '';
      }
    }

    > svg {
      display: none;

      @media (max-width: 540px) {
        display: block;
        position: absolute;
        right: 1rem;
        top: 20%;
      }
    }

    @media (max-width: 540px) {
      width: 100%;
      max-width: none;

      padding: 0.35rem 0;
      text-decoration: underline;
    }
  }

  > div {
    display: flex;

    @media (max-width: 540px) {
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  @media (max-width: 540px) {
    position: sticky;
    top: 4rem;

    flex-direction: column;
    height: 100vh;

    display: ${({ menuMobileVisible }) =>
      menuMobileVisible ? 'block' : 'none'};

    z-index: 4;

    html {
      overflow-y: ${({ menuMobileVisible }) =>
        menuMobileVisible ? 'hidden' : 'scroll'};
    }
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

    @media (max-width: 540px) {
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

    @media (max-width: 540px) {
      position: relative;
    }
  }

  :hover {
    ul {
      height: auto;
    }
  }

  @media (max-width: 540px) {
    width: 100%;
  }
`;

export const SizeFilters = styled(BrandFilters)``;

export const ColorFilters = styled(BrandFilters)``;

export const FormSearchByPrice = styled(BrandFilters)`
  :hover {
    form {
      height: auto;

      border-top: 1px solid ${({ theme }) => theme.colors.gray[250]};

      @media (max-width: 540px) {
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[250]};
      }

      padding: 1rem;
    }
  }

  @media (max-width: 540px) {
    ${Container} {
      form {
        width: 100%;

        input {
          max-width: none;
          width: 90%;
        }

        button {
          width: 50%;
          margin: 0 auto;
        }
      }
    }
  }
`;

export const GoToCartMobileResponsivity = styled.a`
  display: none;

  background: ${({ theme }) => theme.colors.pink[400]};
  padding: 0.35rem 0;

  p {
    font-weight: 600;
  }

  @media (max-width: 540px) {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.25rem;
    margin-top: 2rem;
  }
`;
