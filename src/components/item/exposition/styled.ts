import styled from 'styled-components';

export const Container = styled.div`
  max-width: 270px;
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
  }
`;

export const Details = styled.section`
  margin-bottom: ${({ theme }) => theme.spacings.small};
`;

export const Price = styled.p`
  font-size: 1.4rem;
`;

export const ShoesDetailsSection = styled.section`
  display: flex;
  flex-direction: column;
`;
