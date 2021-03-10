import React from 'react';
import { Box } from 'grommet';

export const LayerPreview = () => (
    <Box fill direction="row">
      <Box basis="3/4" background="background-contrast" />
      <Box basis="1/4" background="background-back" />
    </Box>
  );
