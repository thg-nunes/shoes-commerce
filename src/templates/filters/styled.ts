import { Container } from '@components/searchByPrice/styled';

import styled from 'styled-components';

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

    ::after {
      content: ' |';

      @media (max-width: 540px) {
        content: '';
      }
    }

    @media (max-width: 540px) {
      margin: 0 auto;
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
    flex-direction: column;
    height: 100vh;
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
