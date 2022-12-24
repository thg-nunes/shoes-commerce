import styled from 'styled-components';

import { Button } from '@components/button/paginationComponent/styled';

export const Container = styled.div`
  position: relative;

  form {
    position: absolute;

    height: 0;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    background: ${({ theme }) => theme.colors.pink[700]};

    label {
      height: 2rem;

      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      line-height: 2rem;
    }

    input {
      max-width: 6rem;

      color: ${({ theme }) => theme.colors.gray[400]};
      padding-left: 0.5rem;

      border: none;
      border-radius: 2px;

      outline-color: ${({ theme }) => theme.colors.pink[300]};
    }

    ${Button} {
      :hover {
        background: ${({ theme }) => theme.colors.pink[300]};
      }
    }
  }
`;
