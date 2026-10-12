// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Diagram, Grid, Stack } from 'grommet';
import { Annotation } from '../../../layouts';
import { TimeInputMock } from './TimeInputMock';

const annotations = [
  { label: '1', target: 'label', anchor: 'horizontal' },
  { label: '2', target: 'field', anchor: 'horizontal' },
  { label: '2a', target: 'sections', anchor: 'vertical' },
  { label: '2b', target: 'period', anchor: 'vertical' },
  { label: '3', target: 'button', anchor: 'horizontal' },
  { label: '4', target: 'drop', anchor: 'horizontal' },
  { label: '5', target: 'option', anchor: 'horizontal' },
];

const connections = annotations.map(({ label, target, anchor }) => ({
  anchor,
  type: 'direct',
  color: 'border',
  thickness: 'hair',
  fromTarget: `timeinput-annotation-${label}`,
  toTarget: `timeinput-anatomy-${target}`,
}));

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', 'max-content', 'max-content', 'max-content']}
    rows={['auto', 'auto', 'auto', 'auto', 'flex', 'flex']}
    areas={[
      ['annotation-1', 'label', 'label', 'empty-label'],
      ['annotation-2', 'field', 'field', 'annotation-3'],
      ['annotation-2a', 'drop', 'drop', 'empty-drop-top'],
      ['annotation-2b', 'drop', 'drop', 'empty-drop-middle'],
      ['annotation-4', 'drop', 'drop', 'annotation-5'],
      ['annotation-4', 'drop', 'drop', 'annotation-5'],
    ]}
    gap={{ row: '3xsmall', column: 'xsmall' }}
    align="center"
    justify="center"
    justifyContent="start"
    {...rest}
  />
);

export const TimeInputAnatomy = () => (
  <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
    <AnatomyGrid>
      {annotations.map(({ label }) => (
        <Annotation
          key={label}
          id={`timeinput-annotation-${label}`}
          target={label}
          gridArea={`annotation-${label}`}
        />
      ))}
      <TimeInputMock />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);
