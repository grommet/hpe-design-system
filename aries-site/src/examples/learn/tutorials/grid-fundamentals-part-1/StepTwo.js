// App.js
import React from 'react';
import { Grommet, Box, Heading, Text, Grid, ThemeContext } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <Heading level="1">Products</Heading>
      <Grid columns={{ count: 3, size: 'auto' }}>
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </Grommet>
  );
};
