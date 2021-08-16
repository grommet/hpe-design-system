import React from 'react';
import { Box, Diagram, Stack } from 'grommet';
import { Notification } from './ToastNotification';

const color = 'black';
const anchor = 'vertical';
const thickness = 'xxxsmall';
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
        toTarget: 'content',
    },
    {
        anchor,
        type,
        color,
        thickness,
        fromTarget: '3',
        toTarget: 'close-button',
    },
];

export const ToastDiagram = () => (
    <Stack>
      <Box gap="medium" pad={{bottom: 'medium'}}>
        <Box direction="row" gap="xlarge">
          <Box 
            id="1" 
            border 
            round="full" 
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
          >1</Box>
          <Box 
            id="2" 
            border 
            round="full" 
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
          >2</Box>
          <Box 
            id="3" 
            border 
            round="full" 
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
          >3</Box>
        </Box>
        <Notification title="Status Title" message="This is a status message" onClose />
      </Box>
      <Diagram connections={connections} />
    </Stack>
);
