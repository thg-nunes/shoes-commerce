import { BsCartPlusFill } from 'react-icons/bs';

import * as Styled from './styled';

export type ButtonProps = {
  textButton: string;
  quantityItemInCart?: number;
  actionOnClick?: () => void;
};

export function Button({
  textButton,
  quantityItemInCart,
  actionOnClick,
}: ButtonProps): JSX.Element {
  return (
    <Styled.Container onClick={actionOnClick}>
      <span>
        <BsCartPlusFill size={20} fill="#FFFFFF" name="add-item-icon" />
        {quantityItemInCart || 0}
      </span>
      {textButton}
    </Styled.Container>
  );
}
