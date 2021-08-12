import React, { useState } from 'react';
import { Box, Button, Text, Diagram, Stack } from 'grommet';
import { Notification } from './ToastNotification';

export const ToastNotificationExample = () => {

    const [visible, setVisible] = useState();

    const onOpen = () => {
        setVisible(true);
        setTimeout(() => {
        setVisible(undefined);
        }, 8000);
    };

    const onClose = () => setVisible(undefined);

    return (
        <>
            <Box align="center" gap="medium">
                <Text textAlign="center">
                    For example purposes, this Toast Notification
                    will disappear after 8 seconds. This is the 
                    recommended lifetime for a toast, as it allows
                    screen readers to relay the content in a 
                    notification. 
                </Text>
                <Button 
                    label="Show me the Notification" 
                    onClick={onOpen} 
                    primary 
                />
            </Box>
            <Box align="center" gap="small">
                {visible && <Notification 
                    toast
                    status="good"
                    title="Toast success!"
                    message="The operation was successful"
                    onClose={onClose}
                />}
            </Box>
        </>
    );
};

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
