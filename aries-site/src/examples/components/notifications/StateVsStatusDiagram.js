import React from 'react';
import { Notification } from './Notification';
import { Box, Text, Diagram, Stack } from 'grommet';

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
];

export const StateVsStatusDiagram = () => (
    <Stack>
        <Box gap="medium" pad={{bottom: 'medium'}}>
        <Box gap="large">
            <Box id="2" pad="small" width="small" background="background-front">
                <Text>The state of this task is successful</Text>
            </Box>
            <Notification title="Invitation sent to user!" onClose />
            <Box id="1" pad="small" width="small" background="background-front">
                <Text>The status is normal because the state is successful</Text>
            </Box>
        </Box>
        </Box>
        <Diagram connections={connections} />
    </Stack>
);
