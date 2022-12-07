import { ExpositionItem } from '@components/item/exposition';
import * as Styled from './styled';

export type ItemsExpositionProps = {
  itemsList: {
    id: string;
    brand: string;
    title: string;
    description: string;
    image: string;
    size: number;
    stock: number;
    price: number;
  }[];
};

export function ItemsExposition({
  itemsList,
}: ItemsExpositionProps): JSX.Element {
  return (
    <Styled.Container>
      {itemsList !== undefined &&
        itemsList.map((item) => (
          <ExpositionItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            src={item.image}
          />
        ))}
    </Styled.Container>
  );
}
