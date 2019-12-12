import React from 'react';
import { Grommet, Box } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

import { Button } from 'aries-core';

export default {
  title: 'Button',
};

export const Simple = () => (
  <Grommet theme={hpe} full>
    <Box direction="row" gap="medium" pad="large">
      <Box gap="medium" align="center" background="black" pad="large">
        <Button label="Default" />
        <Button label="Anchor" href="#" />
        <Button label="Primary" primary />
        <Button label="Disabled" disabled />
      </Box>
      <Box gap="medium" align="center" background="white" pad="large">
        <Button label="Default" />
        <Button label="Anchor" href="#" />
        <Button label="Primary" primary />
        <Button label="Disabled" disabled />
      </Box>
    </Box>
  </Grommet>
);
