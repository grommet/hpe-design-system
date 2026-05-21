import React from 'react';
import { Box, Button, Grid, Diagram, Stack, Text } from 'grommet';
import { Notification } from '@hpe-design/icons-grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const thickness = 'hair';
const type = 'direct';

const connections = [
    {
        anchor: 'horizontal',
        type,
        color,
        thickness,
        fromTarget: '1',
        toTarget: 'button-container',
    },
    {
        anchor: 'vertical',
        type,
        color,
        thickness,
        fromTarget: '1a',
        toTarget: 'button-label',
    },
    {
        anchor: 'vertical',
        type,
        color,
        thickness,
        fromTarget: '1b',
        toTarget: 'button-icon',
    },
    {
        anchor: 'vertical',
        type,
        color,
        thickness,
        fromTarget: '1c',
        toTarget: 'button-badge',
    },
];

const AnatomyGrid = ({ ...rest }) => (
    <Grid
        columns={['max-content', 'max-content', '5xsmall']}
        rows={['auto', 'auto', 'auto']}
        areas={[
            ['annotation-1b', 'annotation-1a', 'annotation-1c'],
            ['button-area', 'button-area', 'empty-0'],
            ['button-area', 'button-area', 'annotation-1'],
        ]}
        align="center"
        justify="center"
        gap={{ column: 'medium', row: 'small' }}
        {...rest}
    />
);

export const ButtonAnatomy = () => {
    const annotations = [
        {
            id: '1',
            gridArea: 'annotation-1',
            target: '1',
            style: { justifySelf: 'start' },
        },
        { id: '1a', gridArea: 'annotation-1a', target: '1a' },
        {
            id: '1b',
            gridArea: 'annotation-1b',
            target: '1b',
            style: { justifySelf: 'start' },
        },
        {
            id: '1c',
            gridArea: 'annotation-1c',
            target: '1c',
            style: { justifySelf: 'start' },
        },
    ];

    return (
        <Stack margin={{ bottom: 'medium' }} interactiveChild="last">
            <AnatomyGrid>
                {annotations.map(({ id, gridArea, target, ...rest }) => (
                    <Annotation
                        key={id}
                        id={id}
                        target={target}
                        gridArea={gridArea}
                        {...rest}
                    />
                ))}

                <Box
                    gridArea="button-area"
                    align="start"
                    id="button-container"
                    border={{ style: 'dashed' }}
                    round="small"
                >
                    <Button
                        label={<Box id="button-label">Notifications</Box>}
                        icon={<Notification id="button-icon" />}
                        tabIndex={-1}
                        badge={
                            <Box
                                id="button-badge"
                                background="background-neutral-xstrong"
                                round
                                align="center"
                                justify="center"
                                width={{ min: '18px' }}
                                height="18px"
                            >
                                <Text
                                    size="xsmall"
                                    color="text-strong"
                                    weight="normal">
                                    2
                                </Text>
                            </Box>
                        }
                    />
                </Box>
            </AnatomyGrid>
            <Diagram connections={connections} />
        </Stack>
    );
};
