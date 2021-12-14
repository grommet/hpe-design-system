import React from 'react';
import { Box, Diagram, Stack } from 'grommet';
import { Annotation } from '../namevaluelist/NameValueListAnatomy';
import { AnatomyBox, AnatomyGrid } from '.';

const color = 'border';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'border-basic',
  },
  {
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'name-basic',
  },
];

export const TagBasicAnatomy = () => (
  <Stack>
    <AnatomyGrid columns={['xxsmall', 'small']}>
      <Box />
      <Annotation id={1} target="1" />
      <Box alignSelf="center">
        <Annotation id={2} target="2" />
      </Box>
      <AnatomyBox id="border-basic" nameId="name-basic" />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);
