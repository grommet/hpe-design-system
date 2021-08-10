import React from 'react';
import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { FormClose } from 'grommet-icons/icons/FormClose';

import { Notification } from '../../examples';
import { Box, Button, Text, Diagram, Stack } from 'grommet';

export const ToastPreview = () => (
    <Box align="center" justify="center" fill background="background-back">
      <Box 
            elevation="medium" 
            round="xsmall" 
            pad={{ horizontal: 'medium', vertical: 'xsmall' }} 
            background={{ color: 'background-front' }}
      >
        <Box direction="row">
          <Box pad={{ right: 'small' }}>
            <StatusGoodSmall color="status-ok" />
          </Box>
          <Box
            gap="medium"
            align="start"
            direction="row"
            justify="between"
            fill
          >
            <Box>
                <Text 
                    weight="bold" 
                    color={{ light: 'black', dark: 'white' }}
                >Hooray!</Text>
                <Text 
                    color={{ light: 'black', dark: 'white' }}
                >Your toast is done!</Text>
            </Box>
            <Button
              icon={<FormClose color={{ light: 'black', dark: 'white' }} />}
              plain
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );

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

