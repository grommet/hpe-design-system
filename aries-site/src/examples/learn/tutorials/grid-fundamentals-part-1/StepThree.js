/* eslint-disable no-unused-vars */
// App.js
import { Grid, Heading } from 'grommet';
import { ProductCard } from './ProductCard';
import productList from './product-list.json';

const ProductsPage = () => {
  return (
    <>
      <Heading level={1}>Products</Heading>
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

        <ProductsPage />

  );
};
