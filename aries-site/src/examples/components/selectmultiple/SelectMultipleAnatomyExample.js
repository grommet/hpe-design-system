import { Box, Diagram, Stack } from 'grommet';
import React from 'react';
import { Annotation } from '../../../layouts';
import { AnatomyGrid, SelectMultipleAnatomy } from './SelectMultipleAnatomy';

const color = 'border';
const anchor = 'horizontal';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'select',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'selected',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'search',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'limit',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '5',
    toTarget: 'list',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '6',
    toTarget: 'listItem',
  },
];

export const SelectMultipleAnatomyExample = () => (
  <Stack interactiveChild="first">
    <AnatomyGrid>
      <SelectMultipleAnatomy gridArea="component" alignSelf="start"/>
      <Annotation id={1} target="1" gridArea="a1" />
      <Annotation id={2} target="2" gridArea="a2" />
      <Annotation id={3} target="3" gridArea="a3" />
      <Annotation id={4} target="4" gridArea="a4" />
      <Annotation id={5} target="5" gridArea="a5" />
      <Annotation id={6} target="6" gridArea="a6" />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);

