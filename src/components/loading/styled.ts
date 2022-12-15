import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  text-align: center;

  span {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 2px solid ${({ theme }) => theme.colors.pink[300]};
    border-top-color: ${({ theme }) => theme.colors.gray[250]};
    animation: loadingRotation 1s infinite linear;
    border-radius: 50%;

    @keyframes loadingRotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
`;
