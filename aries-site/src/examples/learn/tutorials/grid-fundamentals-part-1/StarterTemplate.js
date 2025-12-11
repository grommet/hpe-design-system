/* eslint-disable no-unused-vars */
// App.js
import React from 'react';
import { Grommet, Text, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

const ProductsPage = () => {
  return <Text>hello world</Text>;
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
