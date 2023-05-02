import React from 'react';
import { Box, Button } from 'grommet';
import { LayerHeader } from 'aries-core';
import { LayerContainer } from './components/LayerContainer';

export const ActionableLayerClose = () => (
  <LayerContainer margin={{ bottom: 'medium' }} width={{ max: 'medium' }}>
    <LayerHeader />
    <Box
      height="small"
      align="center"
      justify="center"
      border={{ style: 'dashed' }}
    >
      Body content
    </Box>
    <Box flex={false} direction="row" justify="end" gap="small">
      <Button label="Cancel" />
      <Button label="Confirm action" primary id="layer-close-actions" />
    </Box>
  </LayerContainer>
);
