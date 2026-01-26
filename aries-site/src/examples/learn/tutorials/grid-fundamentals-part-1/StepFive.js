/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { ThemeContext, Grid, Heading } from 'grommet';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';
import { midSize } from './utils';

const ProductsPage = () => {
  const themeContext = React.useContext(ThemeContext);
  const minColumnWidth = midSize('small', 'medium', themeContext);

  return (
    <>
      <Heading level={1}>Products</Heading>
      <Grid columns={minColumnWidth} gap="xsmall">
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </>
  );
};

export const App = () => {
  return (

        <ProductsPage />

  );
};
