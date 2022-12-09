import styled from 'styled-components';

import { Button } from '@components/button/paginationComponent/styled';

export const SizeOption = styled(Button)`
  font-size: 0.85rem;
  background: transparent;

  :hover {
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;
