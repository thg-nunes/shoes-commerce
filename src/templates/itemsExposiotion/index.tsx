import { ExpositionItem } from '@components/item/exposition';
import { Pagination } from '@components/pagination';
import { useEffect, useState } from 'react';
import * as Styled from './styled';

export type ItemsList = {
  id: string;
  brand: string;
  title: string;
  description: string;
  image: string;
  size: number;
  stock: number;
  price: number;
}[];

export type ItemsExpositionProps = {
  itemsList: ItemsList;
};

export function ItemsExposition({
  itemsList,
}: ItemsExpositionProps): JSX.Element {
  const [itemsOfThePage, setItemsOfThePage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

  useEffect(() => {
    const init_slice = currentPage === 1 ? 0 : itemsPerPage;
    const end_slice = currentPage === 1 ? itemsPerPage : itemsPerPage * 2;

    const itemsToExposition = itemsList.slice(init_slice, end_slice);

    setItemsOfThePage(itemsToExposition);
  }, [currentPage, itemsList]);

  return (
    <Styled.Container>
      <section>
        {itemsOfThePage.length &&
          itemsOfThePage.map((item) => (
            <ExpositionItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              src={item.image}
            />
          ))}
      </section>
      <Pagination
        pageActive={currentPage}
        totalPage={itemsList.length / 12}
        setPage={setCurrentPage}
      />
    </Styled.Container>
  );
}
