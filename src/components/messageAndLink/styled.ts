import styled from 'styled-components';

export const MessageInfo = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 93vh;

  a {
    font-size: 1rem;
    font-weight: 600;
    text-decoration: underline;
    transition: 100ms all ease-in-out;

    :hover {
      filter: brightness(0.9);
    }
  }
`;
