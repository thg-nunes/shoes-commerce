import styled from 'styled-components';

import { Button } from '@components/button/paginationComponent/styled';

type ColorOptionProps = {
  color: string;
};

export const ColorOption = styled(Button)<ColorOptionProps>`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;

  background: ${({ color }) => color};

  :hover {
    background: ${({ color }) => color};
  }
`;
