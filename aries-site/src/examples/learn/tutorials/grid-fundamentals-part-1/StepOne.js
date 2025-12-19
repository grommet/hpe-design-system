// App.js
import React from 'react';
import { Grommet, Box, Heading, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

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
        <Box
          background={{ color: 'decorative-blue', opacity: 'weak' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 7</Text>
        </Box>
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
