import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  max-width: 300px;
  background: white;

  color: black;
  padding: 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 3px;

  img {
    position: relative;
    left: 50%;
    transform: translateX(-50%);

    text-align: center;
    width: 200px;

    @media (max-width: 540px) {
      width: 140px;
    }
  }
`;

export const Details = styled.section`
  margin-bottom: ${({ theme }) => theme.spacings.small};

  @media (max-width: 540px) {
    p:nth-child(1) {
      font-size: 0.85rem;
    }
  }
`;

export const Price = styled.p`
  font-size: 1.4rem;
`;
