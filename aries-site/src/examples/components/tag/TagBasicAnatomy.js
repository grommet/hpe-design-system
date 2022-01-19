import React from 'react';
import { Diagram, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
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
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'value-basic',
  },
];

export const TagBasicAnatomy = () => (
  <Stack>
    <AnatomyGrid columns={['xsmall']}>
      <Annotation id={1} target="1" />
      <AnatomyBox id="border-basic" valueId="value-basic" />
      <Annotation alignSelf="center" id={2} target="2" />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);
