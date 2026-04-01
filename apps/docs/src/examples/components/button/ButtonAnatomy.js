import React from 'react';
import { Box, Button, Grid, Diagram, Stack, Text } from 'grommet';
import { Notification } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

// 1a (label) and 1b (icon) sit in the TOP ROW — anchor: 'vertical'.
// 1c (badge) sits in the right col at the TOP of the button
// (badge level) — anchor: 'horizontal'.
// 1 (container) sits in the right col at the CENTER of the button
// — anchor: 'horizontal'.
const connections = [
  {
    // Region 1b: icon — annotation ABOVE col 0, wire draws DOWN
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'button-icon',
  },
  {
    // Region 1a: label — annotation ABOVE col 1, wire draws DOWN
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'button-label',
  },
  {
    // Region 1c: badge — right col row 1 (badge level), wire LEFT
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1c',
    toTarget: 'button-badge-target',
  },
  {
    // Region 1: container — right col row 2 (center), wire LEFT
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'button-container',
  },
];

// 3-column grid, button-area spans rows 1+2:
//   col 0 (max-content) — icon sub-part
//   col 1 (max-content) — label sub-part
//   col 2 (5xsmall)     — right annotation column
//
// Row 0 (5xsmall): [annotation-1b][annotation-1a][empty-0]
// Row 1 (auto):    [button-area   button-area][annotation-1c]
// Row 2 (auto):    [button-area   button-area][annotation-1]
const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', 'max-content', '5xsmall']}
    rows={['5xsmall', 'auto', 'auto']}
    areas={[
      ['annotation-1b', 'annotation-1a', 'empty-0'],
      ['button-area', 'button-area', 'annotation-1c'],
      ['button-area', 'button-area', 'annotation-1'],
    ]}
    align="center"
    {...rest}
  />
);

export const ButtonAnatomy = () => {
  const annotations = [
    { id: '1', gridArea: 'annotation-1', target: '1' },
    { id: '1a', gridArea: 'annotation-1a', target: '1a' },
    { id: '1b', gridArea: 'annotation-1b', target: '1b' },
    { id: '1c', gridArea: 'annotation-1c', target: '1c' },
  ];

  return (
    <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
      <AnatomyGrid>
        {annotations.map(({ id, gridArea, target }) => (
          <Annotation key={id} id={id} target={target} gridArea={gridArea} />
        ))}

        {/* button-area: spans rows 1+2.
            button-badge-target is absolutely positioned at the
            top-right corner of button-container so the 1c wire
            lands precisely at the badge.
            button-container has position:relative to anchor it. */}
        <Box gridArea="button-area" pad={{ vertical: 'xsmall' }}>
          <Box
            id="button-container"
            flex={false}
            style={{ position: 'relative' }}
          >
            {/* Invisible 20×20px target at the badge corner for 1c wire */}
            <Box
              id="button-badge-target"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '20px',
                height: '20px',
              }}
            />
            <Button
              secondary
              icon={<Box id="button-icon" flex={false}><Notification /></Box>}
              label={<Text id="button-label">Notifications</Text>}
              badge={3}
            />
          </Box>
        </Box>
      </AnatomyGrid>

      <Diagram connections={connections} />
    </Stack>
  );
};
