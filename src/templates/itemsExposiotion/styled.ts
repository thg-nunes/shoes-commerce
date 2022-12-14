import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  max-width: 1280px;
  margin: 0 auto;

  > section {
    display: grid;
    grid-gap: 1rem;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    @media (max-width: 768px) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media (max-width: 540px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
