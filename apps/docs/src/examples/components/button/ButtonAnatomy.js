import React from 'react';
import { Box, Button, Grid, Diagram, Stack, Text } from 'grommet';
import { Notification } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

// 1a/1b sit in the TOP ROW — anchor: 'vertical' (wires draw down).
// 1c/1 sit in the right annotation column across flex rows
// — anchor: 'horizontal' (wires draw left into the button).
// button-area spans rows 1–3 (flex) so annotations distribute
// cleanly at badge level and container center.
const connections = [
  {
    // 1b: icon — annotation above col 0, wire draws down
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'button-icon',
  },
  {
    // 1a: label — annotation above col 1, wire draws down
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'button-label',
  },
  {
    // 1c: badge — right col row 1, wire draws left to badge corner
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1c',
    toTarget: 'button-badge-target',
  },
  {
    // 1: container — right col row 2, wire draws left to container
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'button-container',
  },
];

// Matching MenuAnatomy's flex-row pattern:
// button-area spans rows 1–3 so the button grows to fill them.
// annotation-1c sits at row 1 (top of button — badge level).
// annotation-1  sits at row 2 (center — container level).
// empty-1       sits at row 3 (bottom spacer for balance).
const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['max-content', 'max-content', '5xsmall']}
    rows={['5xsmall', 'flex', 'flex', 'flex']}
    areas={[
      ['annotation-1b', 'annotation-1a', 'empty-0'],
      ['button-area', 'button-area', 'annotation-1c'],
      ['button-area', 'button-area', 'annotation-1'],
      ['button-area', 'button-area', 'empty-1'],
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

        {/* button-area: spans rows 1–3 (flex).
            button-badge-target is a zero-size Box at the top-right
            of button-container so the 1c wire lands at the badge.
            button-container has position:relative to anchor it. */}
        <Box gridArea="button-area" align="start" justify="center">
          <Box
            id="button-container"
            flex={false}
            style={{ position: 'relative' }}
          >
            <Box
              id="button-badge-target"
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '1px',
                height: '1px',
              }}
            />
            <Button
              secondary
              icon={
                <Box id="button-icon" flex={false}>
                  <Notification />
                </Box>
              }
              label={
                <Text id="button-label">Notifications</Text>
              }
              badge={3}
            />
          </Box>
        </Box>
      </AnatomyGrid>

      <Diagram connections={connections} />
    </Stack>
  );
};
