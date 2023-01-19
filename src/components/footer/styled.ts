import styled from 'styled-components';

export const Container = styled.footer`
  background: ${({ theme }) => theme.colors.black[400]};

  svg {
    fill: ${({ theme }) => theme.colors.pink[300]};
  }

  @media (max-width: 540px) {
    width: 95%;
    margin: 0 auto;

    padding: 0 0.5rem;
    margin-bottom: 2rem;
  }
`;

export const FooterIcons = styled.div`
  max-width: 95%;
  margin: 0 auto;

  display: flex;
  justify-content: space-between;
  padding: 1rem 0;

  @media (max-width: 540px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem 0;
  }
`;

export const Truck = styled.section`
  max-width: max-content;

  font-weight: 600;
  color: ${({ theme }) => theme.colors.white[100]};

  display: flex;
  align-items: center;
  gap: 1rem;

  span {
    display: block;
    font-weight: 400;
    font-size: 0.85rem;
  }
`;

export const Time = styled(Truck)``;

export const Card = styled(Truck)``;

export const HelpSection = styled.section`
  max-width: 95%;
  margin: 0 auto;
  border-top: 1px solid ${({ theme }) => theme.colors.pink[250]};
  padding: 3rem 0;

  display: flex;
  justify-content: space-between;
  gap: 2rem;

  p {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.white[100]};
  }

  a {
    font-size: 0.8rem;

    :hover {
      color: ${({ theme }) => theme.colors.pink[400]};
      text-decoration: underline;
    }
  }
`;

export const Institutioinal = styled.div`
  max-width: max-content;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Help = styled(Institutioinal)``;

export const MediaSocial = styled(Institutioinal)`
  svg {
    fill: ${({ theme }) => theme.colors.white[100]};
    padding: 0.25rem;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.blue[200]};
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    :hover {
      filter: brightness(0.85);
    }
  }
`;

export const SocialIcons = styled.section`
  display: flex;
  gap: 1rem;
`;
