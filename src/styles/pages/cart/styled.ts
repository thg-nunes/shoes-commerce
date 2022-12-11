import styled from 'styled-components';

export const Container = styled.main`
  max-width: 1280px;
  margin: 0 auto;

  background: ${({ theme }) => theme.colors.white[100]};
`;

export const Table = styled.table`
  width: 100%;

  padding: ${({ theme }) => theme.spacings.medium};
`;

export const TableHead = styled.thead`
  color: ${({ theme }) => theme.colors.gray[250]};
`;

export const TableBody = styled.tbody`
  color: ${({ theme }) => theme.colors.gray[800]};
  font-weight: 600;

  img {
    max-width: 150px;
  }
`;

export const TableRow = styled.tr`
  th {
    text-align: start;
  }
`;

export const TableData = styled.td`
  min-width: 10rem;

  span {
    font-size: 1.4rem;
  }
`;

export const SectionUpdateProductQuantity = styled.section`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  span {
    width: 3rem;
    height: 1.7rem;

    font-size: 0.95rem;
    color: ${({ theme }) => theme.colors.gray[400]};

    padding-top: 0.06rem;
    padding-left: 0.5rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[250]};
    border-radius: 2px;
  }
`;
