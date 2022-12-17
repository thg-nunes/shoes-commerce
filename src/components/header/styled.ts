import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;
  height: 4rem;
  max-width: 1280px;

  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1366px) {
    width: 95%;
  }
`;

export const Logo = styled.section`
  display: flex;
  align-items: center;

  gap: 0.5rem;
  line-height: 4rem;
`;

export const ShoppingCart = styled.section`
  display: flex;
  align-items: center;

  height: 4rem;
  gap: 0.5rem;
`;

export const TextSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.9rem;
  }

  span {
    display: inline-block;
    width: 100%;
    text-align: right;
    font-size: 0.65rem;
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const CartAndInputForm = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 0.5rem;

  form {
    text-align: end;

    input {
      width: 70%;
      padding: 0.15rem 0;
      padding-left: 0.5rem;
      border: none;
      background: ${({ theme }) => theme.colors.white[100]};
      outline: none;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      transition: 250ms all linear;

      :focus {
        width: 100%;
      }
    }
  }
`;
