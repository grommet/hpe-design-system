import React from "react";
import { Box, Grid } from "grommet";
import { CodeWars, HPEDiscover, HPENvidia } from "./stories/index";

const areas = [
    ['story-1', 'story-1', 'story-2', 'story-2'],
    ['story-3', 'story-4', 'story-5', 'story-6']
];

const columns = ['flex', 'flex', 'flex', 'flex'];
const rows = [['large', 'auto'], ['small', 'auto']];
const gap = 'xxlarge';

export const Stories = ({...rest}) => {
    return (
        <Grid 
            areas={areas} 
            columns={columns} 
            rows={rows}
            gap={gap} 
            pad="xxlarge"
            {...rest}
        >
            <HPEDiscover gridArea="story-1" />
            <HPENvidia gridArea="story-2" />
            <CodeWars gridArea="story-3" />
            <Box gridArea="story-4">
                Story 4
            </Box>
            <Box gridArea="story-5">
                Story 5
            </Box>
            <Box gridArea="story-6">
                Story 6
            </Box>
        </Grid>
    );
}