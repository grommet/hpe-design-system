/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { Grommet, Text, Grid, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

const ProductsPage = () => {
  return (
    <>
      {/* Using Text instead of Heading to avoid multiple h1s on
          the tutorial page. In the CodeSandbox example, 
          users will use <Heading level={1}>Products</Heading> */}
      <Text
        weight={500}
        size="xxlarge"
        margin={{ bottom: 'small', top: 'none' }}
      >
        Products
      </Text>
      <Grid columns="medium">
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
      <Box
        pad="small"
        round="small"
        background={{ color: 'background-back' }}
        border={{ color: 'border-weak' }}
      >
        <ProductsPage />
      </Box>
    </Grommet>
  );
};
