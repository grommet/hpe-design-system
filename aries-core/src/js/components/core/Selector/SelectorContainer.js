import React from 'react';
import { Box, Text } from 'grommet';
import { Selector } from './Selector';
import { SelectorIndicator } from './SelectorIndicator';

const SelectorContainer = ({ children, title, value }) => (
  <Selector value={value}>
    <Box pad="small" direction="row" justify="between">
      <Text weight={500}>{title}</Text>
      <SelectorIndicator />
    </Box>
    {children}
  </Selector>
);

export { SelectorContainer };
