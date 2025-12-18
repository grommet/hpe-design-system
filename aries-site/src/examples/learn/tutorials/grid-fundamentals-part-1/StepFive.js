/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { Grommet, Heading, ThemeContext, Grid, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';
import { midSize } from './utils';

const ProductsPage = () => {
  const themeContext = React.useContext(ThemeContext);
  const minColumnWidth = midSize('small', 'medium', themeContext);

  return (
    <>
      <Heading level={1} margin={{ bottom: 'small', top: 'none' }}>
        Products
      </Heading>
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
