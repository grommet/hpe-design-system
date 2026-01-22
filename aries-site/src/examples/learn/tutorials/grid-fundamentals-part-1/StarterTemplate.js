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
    <Grommet theme={hpe}>
      <Box
        pad="small"
        round="small"
        background={{ color: 'background-back' }}
        border={{ color: 'border-weak' }}
      >
        <ProductsPage />
      </Box>
    </Grommet>
  );
};
