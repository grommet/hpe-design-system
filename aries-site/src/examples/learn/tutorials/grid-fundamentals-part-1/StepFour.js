// App.js
import { Grommet, Box, Heading, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';

const productList = require('./product-list.json');

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <Heading level="1">Products</Heading>
      <Grid columns={{ count: 'fill', size: '250px' }} gap="medium">
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </Grommet>
  );
};
