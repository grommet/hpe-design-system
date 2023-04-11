import { Grommet, Box, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { ProductCard } from './ProductCard';

const productList = require('./product-list.json');

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <Grid columns="1/3">
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </Grommet>
  );
};
