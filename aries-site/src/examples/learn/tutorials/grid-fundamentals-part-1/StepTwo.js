/* eslint-disable no-unused-vars */
// App.js
import { Heading, Grid } from 'grommet';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

const ProductsPage = () => {
  return (
    <section>
      <Heading level={1}>Products</Heading>
      <Grid columns={{ count: 3, size: 'auto' }}>
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
