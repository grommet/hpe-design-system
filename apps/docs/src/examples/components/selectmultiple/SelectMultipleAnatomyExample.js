import { Diagram, Stack } from 'grommet';
import React from 'react';
import { Annotation } from '../../../layouts';
import {
  AnatomyGrid,
  SelectMultipleInput,
  SelectMultipleLimit,
  SelectMultipleOptions,
  SelectMultipleSearch,
  SelectMultipleSelected,
} from './SelectMultipleAnatomy';

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
    fromTarget: 'search',
    toTarget: '3',
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
    fromTarget: 'list',
    toTarget: '5',
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
      <SelectMultipleInput id="select" gridArea="select" />
      <SelectMultipleSelected id="selected" gridArea="selected" />
      <SelectMultipleSearch id="search" gridArea="search" />
      <SelectMultipleLimit id="limit" limit={6} gridArea="limit" />
      <SelectMultipleOptions id="list" gridArea="list" />
      <Annotation id={1} target="1" gridArea="a1" margin={{ top: '26px' }} />
      <Annotation id={2} target="2" gridArea="a2" />
      <Annotation id={3} target="3" gridArea="a3" />
      <Annotation id={4} target="4" gridArea="a4" margin={{ top: '3xsmall' }} />
      <Annotation id={5} target="5" gridArea="a5" />
      <Annotation id={6} target="6" gridArea="a6" margin={{ top: '38px' }} />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);

