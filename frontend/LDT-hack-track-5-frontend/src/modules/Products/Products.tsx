import { SimpleGrid, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { product } from '../../API/admin/interfaces';
import { getAllProducts } from '../../API/market';
import { CardProduct } from '../../components/CardProduct/CardProduct';
import classes from './Products.module.css';

export const Products = () => {
  useEffect(() => {
    getAllProducts().then((values) => setProducts(values));
  }, []);
  const [products, setProducts] = useState<product[]>([]);
  return (
    <>
      <Title className={classes.title}>Магазин</Title>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
        spacing='xl'
        verticalSpacing='xl'
      >
        {products.map((item) => (
          <CardProduct
            id={item.productId}
            key={item.productId}
            image={item.imagePath}
            price={item.cost}
          />
        ))}
      </SimpleGrid>
    </>
  );
};
