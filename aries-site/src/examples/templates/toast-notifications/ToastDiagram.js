import React from 'react';
import { Box, Diagram, Stack } from 'grommet';
import { ToastPreview } from '../../cardPreviews';

const color = 'text-strong';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'rectilinear';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'status-indicator',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'title',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'message',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'close-button',
  },
];

export const ToastDiagram = () => (
  <Stack>
    <Box gap="medium" pad={{ bottom: 'medium' }}>
      <Box direction="row" gap="xlarge">
        <Box
          id="1"
          border
          round="full"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
        >
          1
        </Box>
        <Box
          id="2"
          border
          round="full"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
        >
          2
        </Box>
        <Box
          id="3"
          border
          round="full"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
        >
          3
        </Box>
        <Box
          id="4"
          border
          round="full"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
        >
          4
        </Box>
      </Box>
      <ToastPreview title="Status title" message="This is a status message" />
    </Box>
    <Diagram connections={connections} />
  </Stack>
);
