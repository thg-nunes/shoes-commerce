import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-right: 1rem;

  color: white;
  height: 2rem;

  border: none;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.pink[300]};

  svg {
    padding: 0.1rem;
  }

  span {
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    height: 2rem;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    padding: 0.5rem;
    background: ${({ theme }) => theme.colors.pink[400]};
  }

  :hover {
    filter: brightness(0.9);
    transition: 250ms all ease-in-out;
  }
`;
