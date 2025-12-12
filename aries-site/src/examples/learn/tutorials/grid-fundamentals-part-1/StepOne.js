// App.js
import React from 'react';
import { Grommet, Box, Heading, Text, Grid } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const ProductsPage = () => {
  return (
    <>
      <Heading level={1} margin={{ bottom: 'small', top: 'none' }}>
        Products
      </Heading>
      <Grid columns={{ count: 3, size: 'auto' }}>

        <Box
          background={{ color: 'background-info' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 1</Text>
        </Box>
        <Box
          background={{ color: 'background-info' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 2</Text>
        </Box>
        <Box
          background={{ color: 'background-info' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 3</Text>
        </Box>
        <Box
          background={{ color: 'background-info' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 4</Text>
        </Box>
        <Box
          background={{ color: 'background-info' }}
          border
          pad="medium"
          align="center"
        >
          <Text size="large">Product 5</Text>
        </Box>
        <Box
          background={{ color: 'background-info' }}
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
    <Grommet theme={hpe} background={{ color: 'transparent' }}>
      <Box pad="small" round="small" background={{ color: 'background-front' }}>
        <ProductsPage />
      </Box>
    </Grommet>
  );
};
