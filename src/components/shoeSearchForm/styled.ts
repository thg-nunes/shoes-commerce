import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  align-items: center;
  justify-content: end;

  svg {
    min-width: 30px;
    min-height: 30px;
    background: ${({ theme }) => theme.colors.white[100]};
  }
`;

export const Input = styled.input``;
