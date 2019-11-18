import React from 'react';
import { Box, Grommet } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { Nav } from 'aries-core';

export default {
  title: 'Nav',
};

export const simple = () => (
  <Grommet theme={hpe} full>
    <Box background="dark-1" fill>
      <Nav title="Service Name" />
    </Box>
  </Grommet>
);
