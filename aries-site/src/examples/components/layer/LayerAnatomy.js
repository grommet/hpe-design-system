import React, { useContext } from 'react';
import {
  Box,
  Card,
  CardBody,
  Diagram,
  Grid,
  Stack,
  ResponsiveContext,
} from 'grommet';
import { LayerHeader } from 'aries-core';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

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

export const LayerAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  const mobile = !['large', 'xlarge'].includes(breakpoint);
  let columns = ['36px', 'medium', 'auto'];
  let rows = [
    '48px',
    '24px',
    '37px',
    '25px',
    '24px',
    'xsmall',
    '24px',
    '74px',
    '24px',
    '48px',
  ];

  let areas = [
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
  ];

  if (['xsmall', 'small'].includes(breakpoint)) {
    columns = ['36px', 'flex'];
    rows = [
      '48px',
      '24px',
      '37px',
      '25px',
      '24px',
      '3xsmall',
      '3xsmall',
      '24px',
      '74px',
      '24px',
      '48px',
    ];
    areas = [
      ['empty-0', 'annotation-pad'],
      ['empty-0', 'layer'],
      ['annotation-1a', 'layer'],
      ['annotation-1b', 'layer'],
      ['gap-1', 'layer'],
      ['annotation-2', 'layer'],
      ['annotation-gap', 'layer'],
      ['gap-2', 'layer'],
      ['annotation-3', 'layer'],
      ['annotation-round', 'layer'],
      ['empty-2', 'layer'],
      ['empty-2', 'annotation-elevation'],
    ];
  }
  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={{ column: 'xlarge' }}
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
        <Box align="center" gridArea="annotation-pad" width="100%">
          <Annotation
            id="pad"
            kind="style"
            target={mobile ? '4' : 'pad="medium"'}
          />
        </Box>
        <Annotation
          kind="style"
          alignSelf="center"
          id="gap"
          target={mobile ? '5' : 'gap="medium"'}
          gridArea="annotation-gap"
        />
        <Box align="center" gridArea="annotation-elevation" width="100%">
          <Annotation
            id="elevation"
            kind="style"
            target={mobile ? '7' : 'elevation="large"'}
          />
        </Box>
        <Annotation
          alignSelf="center"
          id="round"
          kind="style"
          target={mobile ? '6' : 'round="small"'}
          gridArea="annotation-round"
        />
        <LayerContent gridArea="layer" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

const LayerContent = ({ ...rest }) => (
  <Card
    id="layer-container"
    alignSelf="start"
    round="medium"
    elevation="large"
    {...rest}
  >
    <CardBody pad={{ top: 'medium', horizontal: 'medium' }}>
      <LayerHeader
        border={{ style: 'dashed' }}
        subtitle="An optional, concise subtitle for added context."
      />
      <Box pad="xsmall" id="first-gap" />
      <Box
        id="layer-body"
        border={{ style: 'dashed' }}
        height="xsmall"
        align="center"
        justify="center"
      >
        Body
      </Box>
      <Box pad="xsmall" id="layer-gap" />
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
      <Box pad="xsmall" id="bottom-pad" />
    </CardBody>
  </Card>
);
