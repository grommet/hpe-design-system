import React from 'react';
import { Grommet, Box, Button } from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Button',
};

export const Simple = () => (
  <Grommet theme={aries} full>
    <Box direction="row" gap="medium" justify="center" pad="large">
      <Box
        gap="medium"
        align="center"
        background="background-front"
        pad="large"
      >
        <Button label="Default" />
        <Button label="Anchor" href="#" />
        <Button label="Primary" primary />
        <Button label="Disabled" disabled />
      </Box>
      <Box gap="medium" align="center" background="light-1" pad="large">
        <Button label="Default" />
        <Button label="Anchor" href="#" />
        <Button label="Primary" primary />
        <Button label="Disabled" disabled />
      </Box>
    </Box>
  </Grommet>
);
