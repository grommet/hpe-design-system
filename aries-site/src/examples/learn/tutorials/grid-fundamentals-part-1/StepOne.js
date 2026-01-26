// App.js
import { Box, Text, Heading, Grid } from 'grommet';

const ProductsPage = () => {
  return (
    <>
      <Heading level={1}>Products</Heading>
      <Grid columns={{ count: 3, size: 'auto' }}>
        {/* TODO: Using opacity weak is a temporary solution until 
        we have a wider range of colors in the theme. */}
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 1</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 2</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 3</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 4</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 5</Text>
        </Box>
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 6</Text>
        </Box>
      </Grid>
    </>
  );
};

export const App = () => {
  return (
  
        <ProductsPage />

  );
};
