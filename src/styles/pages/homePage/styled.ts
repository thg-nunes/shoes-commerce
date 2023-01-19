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
