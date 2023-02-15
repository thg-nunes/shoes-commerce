import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: end;

  svg {
    min-width: 28px;
    min-height: 28px;
    background: ${({ theme }) => theme.colors.white[100]};

    @media (max-width: 768px) {
      min-width: 30px;
      min-height: 30px;
    }

    @media (max-width: 540px) {
      min-width: 26px;
      min-height: 26px;
    }
  }
`;

export const Input = styled.input``;
