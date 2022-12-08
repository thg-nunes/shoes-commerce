import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > section {
    display: grid;
    grid-gap: 1rem;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  max-width: 1280px;
  margin: 0 auto;
`;

export const ButtonsSecton = styled.section``;
