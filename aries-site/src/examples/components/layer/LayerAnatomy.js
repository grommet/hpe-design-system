import React from 'react';
import { Box, Card, CardBody, Diagram, Grid, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils/utils';

const connections = [
  connection('1', 'layer-header'),
  connection('2', 'layer-body'),
  connection('3', 'layer-footer'),
];

export const LayerAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      alignSelf="start"
      columns={['xsmall', 'auto']}
      rows={['24px', '96px', '24px', 'small', '24px', '96px']}
      areas={[
        ['empty-0', 'layer'],
        ['annotation-1', 'layer'],
        ['gap-1', 'layer'],
        ['annotation-2', 'layer'],
        ['gap-2', 'layer'],
        ['annotation-3', 'layer'],
        ['empty-2', 'layer'],
      ]}
      gap={{ column: 'small' }}
    >
      <Annotation
        alignSelf="center"
        id="1"
        target="1"
        gridArea="annotation-1"
      />
      <Annotation
        alignSelf="center"
        id="2"
        target="2"
        gridArea="annotation-2"
      />
      <Annotation
        alignSelf="center"
        id="3"
        target="3"
        gridArea="annotation-3"
      />
      <LayerContent gridArea="layer" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

const LayerContent = ({ ...rest }) => (
  <Card id="layer-container" alignSelf="start" width="medium" {...rest}>
    <CardBody gap="medium">
      <Box
        id="layer-header"
        align="center"
        justify="center"
        pad="medium"
        flex={false}
        border={{ style: 'dashed' }}
      >
        Header
      </Box>
      <Box
        id="layer-body"
        border={{ style: 'dashed' }}
        height="small"
        align="center"
        justify="center"
      >
        Body
      </Box>
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
    </CardBody>
  </Card>
);
