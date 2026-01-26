/* eslint-disable no-unused-vars */
// App.js
import { Grid, Heading } from 'grommet';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

const ProductsPage = () => {
  return (
    <section>
      <Heading level={1}>Products</Heading>
      <Grid columns="medium" gap="xsmall">
        {productList.map(product => (
          <ProductCard key={product.id} level={2} product={product} />
        ))}
      </Grid>
    </section>
  );
};

export const App = () => {
  return <ProductsPage />;
};
