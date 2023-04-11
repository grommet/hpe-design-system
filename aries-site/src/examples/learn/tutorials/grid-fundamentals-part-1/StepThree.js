// App.js
import { Grommet, Box, Heading, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <Heading level="1">Products</Heading>
      <Grid columns="250px">
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </Grommet>
  );
};
