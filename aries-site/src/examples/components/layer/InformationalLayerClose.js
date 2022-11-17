import React from 'react';
import { Box, Grid, Stack, Diagram } from 'grommet';
import { LayerHeader } from './components/LayerHeader';
import { LayerContainer } from './components/LayerContainer';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils/utils';

const connections = [connection('1', 'layer-close-button')];

export const InformationalLayerClose = () => (
  <Stack interactiveChild="first">
    <Grid
      columns={['medium', 'medium']}
      rows={['24px', '36px', 'auto']}
      areas={[
        ['informational-layer', 'empty'],
        ['informational-layer', 'annotation-close-button'],
        ['informational-layer', 'empty-2'],
      ]}
      gap={{ column: 'medium' }}
    >
      <Annotation
        alignSelf="center"
        id="1"
        target="Default button with FormClose icon"
        width="fit-content"
        pad={{ horizontal: 'small' }}
        gridArea="annotation-close-button"
      />
      <LayerContainer
        margin={{ bottom: 'medium' }}
        gridArea="informational-layer"
      >
        <LayerHeader informational />
        <Box
          height="small"
          align="center"
          justify="center"
          border={{ style: 'dashed' }}
        >
          Body content
        </Box>
      </LayerContainer>
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);
