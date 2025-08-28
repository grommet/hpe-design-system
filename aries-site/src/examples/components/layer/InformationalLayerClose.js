import React from 'react';
import { Box } from 'grommet';
import { LayerHeader } from 'aries-core';
import { LayerContainer } from './components/LayerContainer';

export const InformationalLayerClose = () => (
  <LayerContainer margin={{ bottom: 'medium' }} width={{ max: 'medium' }}>
    <LayerHeader informational />
    <Box
      height='xsmall'
      align="center"
      justify="center"
      border={{ style: 'dashed' }}
    >
      Body content
    </Box>
  </LayerContainer>
);
