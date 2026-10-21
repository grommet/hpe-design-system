// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Diagram, Grid, Stack } from 'grommet';
import type { DiagramProps, GridExtendedProps } from 'grommet';
import { Annotation } from '../../../layouts';
import { TimeInputMock } from './TimeInputMock';

const annotations = [
  { label: '1', target: 'field', anchor: 'horizontal' },
  { label: '1a', target: 'sections', anchor: 'vertical' },
  { label: '1b', target: 'period', anchor: 'vertical' },
  { label: '2', target: 'button', anchor: 'horizontal' },
  { label: '3', target: 'drop', anchor: 'horizontal' },
  { label: '4', target: 'option', anchor: 'horizontal' },
] as const;

const connections: DiagramProps['connections'] = annotations.map(
  ({ label, target, anchor }) => ({
    anchor,
    type: 'direct',
    color: 'border',
    thickness: 'hair',
    fromTarget: `timeinput-annotation-${label}`,
    toTarget: `timeinput-anatomy-${target}`,
  }),
);

const AnatomyGrid = ({ ...rest }: GridExtendedProps) => (
  <Grid
    columns={['max-content', 'max-content', 'max-content', 'max-content']}
    rows={['auto', 'auto', 'auto', 'auto', 'flex', 'flex']}
    areas={[
      ['empty-label-start', 'label', 'label', 'empty-label-end'],
      ['annotation-1', 'field', 'field', 'annotation-2'],
      ['annotation-1a', 'drop', 'drop', 'empty-drop-top'],
      ['annotation-1b', 'drop', 'drop', 'empty-drop-middle'],
      ['annotation-3', 'drop', 'drop', 'annotation-4'],
      ['annotation-3', 'drop', 'drop', 'annotation-4'],
    ]}
    gap={{ row: '3xsmall', column: 'xsmall' }}
    align="center"
    {...rest}
  />
);

export const TimeInputAnatomy = () => (
  <Stack interactiveChild="first">
    <AnatomyGrid>
      {annotations.map(({ label }) => (
        <Annotation
          key={label}
          id={`timeinput-annotation-${label}`}
          // Explicit undefined satisfies TypeScript's inferred required prop.
          kind={undefined} 
          target={label}
          gridArea={`annotation-${label}`}
        />
      ))}
      <TimeInputMock />
    </AnatomyGrid>
    <Diagram connections={connections} />
  </Stack>
);
