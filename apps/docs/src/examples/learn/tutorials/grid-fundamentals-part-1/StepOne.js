/* eslint-disable react/prop-types */
import { Box, Text, Heading, Grid, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const PRODUCTS = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
}));

const ProductCard = ({ name }) => (
  <Box
    background={{ color: 'decorative-blue', opacity: 'weak' }}
    border
    pad="medium"
    align="center"
  >
    <Text size="large">{name}</Text>
  </Box>
);

const ProductsPage = () => {
  return (
    <>
      <Heading level={1}>Products</Heading>
      <Grid columns={{ count: 3, size: 'auto' }}>
        {PRODUCTS.map(product => (
          <ProductCard key={product.id} name={product.name} />
        ))}
      </Grid>
    </>
  );
};

export const App = () => {
  return (
    <Grommet theme={hpe}>
      <ProductsPage />
    </Grommet>
  );
};
