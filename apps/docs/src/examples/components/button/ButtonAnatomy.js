import React from 'react';
import {
  Box,
  Button,
  Grid,
  Diagram,
  Stack,
  Text,
} from 'grommet';
import { Notification } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

// 1b (icon) and 1a (label) are horizontally arranged sub-parts
// → annotations in the top 5xsmall row, anchor: 'vertical'
//   (bubbles sit above; wires draw downward to each element).
//
// 1 (container) and 1c (badge) are at different vertical
// levels on the right side of the button
// → annotations in the rightmost 5xsmall column,
//   anchor: 'horizontal' (wires draw left into the button).
//
// Badge proxy: Button.badge only accepts boolean|number, so
// button-badge-target is a 1x1px absolutely-positioned Box
// at top:0, right:0 of button-container (position:relative).
// Diagram measures it at the badge corner without disrupting
// the component's internal theme styling.
const connections = [
  {
    // 1b: icon — top row col 0, wire draws down
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1b',
    toTarget: 'button-icon',
  },
  {
    // 1a: label — top row col 1, wire draws down
    anchor: 'vertical',
    type,
    color,
    thickness,
    fromTarget: '1a',
    toTarget: 'button-label',
  },
  {
    // 1c: badge — right col row 1 (top of button), wire left
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1c',
    toTarget: 'button-badge-target',
  },
  {
    // 1: container — right col row 2 (center), wire left
    anchor: 'horizontal',
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'button-container',
  },
];

// 3-column grid — mirroring MenuAnatomy's pattern:
//   col 0 (max-content): icon sub-element column
//   col 1 (max-content): label sub-element column
//   col 2 (5xsmall)    : right annotation column
//
// row 0 (5xsmall): annotation-1b above col 0,
//                  annotation-1a above col 1.
// rows 1-3 (flex): button-area spans all three;
//                  right col: annotation-1c at row 1 (badge),
//                  annotation-1 at row 2 (center),
//                  empty-1 at row 3 (bottom spacer).
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
          <Annotation
            key={id}
            id={id}
            target={target}
            gridArea={gridArea}
          />
        ))}

        {/* button-area spans rows 1-3 (flex rows).
            button-container is position:relative so that
            button-badge-target — a 1x1px invisible Box at
            top:0, right:0 — gives Diagram a precise proxy
            target at the badge corner. */}
        <Box
          gridArea="button-area"
          align="start"
          justify="center"
        >
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
