/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { Grommet, Heading, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

const ProductsPage = () => {
  return (
    <>
      <Heading level={1}>Products</Heading>
      <Grid columns="medium" gap="xsmall">
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </>
  );
};

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <ProductsPage />
    </Grommet>
  );
};
