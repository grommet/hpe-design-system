import React from 'react';
import { Box, Card, CardBody, Diagram, Grid, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils/utils';
import { LayerHeader } from './components/LayerHeader';

const connections = [
  connection('1a', 'layer-title'),
  connection('1b', 'layer-subtitle'),
  connection('2', 'layer-body'),
  connection('3', 'layer-footer'),
  connection('pad', 'layer-container', 'vertical'),
  connection('elevation', 'layer-container', 'vertical'),
  connection('gap', 'layer-gap', 'horizontal', 'rectilinear'),
  connection('gap', 'first-gap', 'horizontal', 'rectilinear'),
  connection('round', 'bottom-pad'),
];

export const LayerAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      columns={['xsmall', 'medium', 'auto']}
      rows={[
        '48px',
        '24px',
        '37px',
        '25px',
        '24px',
        'small',
        '24px',
        '74px',
        '24px',
        '48px',
      ]}
      areas={[
        ['empty-0', 'annotation-pad', 'empty'],
        ['empty-0', 'layer', 'empty'],
        ['annotation-1a', 'layer', 'empty'],
        ['annotation-1b', 'layer', 'empty-3'],
        ['gap-1', 'layer', 'empty-3'],
        ['annotation-2', 'layer', 'annotation-gap'],
        ['gap-2', 'layer', 'empty-4'],
        ['annotation-3', 'layer', 'empty-4'],
        ['empty-2', 'layer', 'annotation-round'],
        ['empty-2', 'layer', 'empty-5'],
        ['empty-2', 'annotation-elevation', 'empty-5'],
      ]}
      gap={{ column: 'large' }}
    >
      <Annotation
        alignSelf="center"
        id="1a"
        target="1a"
        gridArea="annotation-1a"
      />
      <Annotation
        alignSelf="center"
        id="1b"
        target="1b"
        gridArea="annotation-1b"
      />
      <Annotation
        alignSelf="center"
        id="3"
        target="3"
        gridArea="annotation-3"
      />
      <Box align="center" gridArea="annotation-pad" width="medium">
        <Annotation id="pad" kind="style" target='pad="medium"' />
      </Box>
      <Annotation
        kind="style"
        alignSelf="center"
        id="gap"
        target='gap="medium"'
        gridArea="annotation-gap"
      />
      <Box align="center" gridArea="annotation-elevation" width="medium">
        <Annotation id="elevation" kind="style" target='elevation="large"' />
      </Box>
      <Annotation
        alignSelf="center"
        id="round"
        kind="style"
        target='round="small"'
        gridArea="annotation-round"
      />
      <LayerContent gridArea="layer" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

const LayerContent = ({ ...rest }) => (
  <Card
    id="layer-container"
    alignSelf="start"
    width="medium"
    round="small"
    elevation="large"
    {...rest}
  >
    <CardBody pad={{ top: 'medium', horizontal: 'medium' }}>
      <LayerHeader border={{ style: 'dashed' }} />
      <Box pad="small" id="first-gap" />
      <Box
        id="layer-body"
        border={{ style: 'dashed' }}
        height="small"
        align="center"
        justify="center"
      >
        Body
      </Box>
      <Box pad="small" id="layer-gap" />
      <Box
        id="layer-footer"
        border={{ style: 'dashed' }}
        align="center"
        justify="center"
        flex={false}
        pad="medium"
      >
        Footer
      </Box>
      <Box pad="small" id="bottom-pad" />
    </CardBody>
  </Card>
);