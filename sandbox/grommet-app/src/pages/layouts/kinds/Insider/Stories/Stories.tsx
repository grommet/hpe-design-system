import React from "react";
import { Box, Grid } from "grommet";
import { 
    CelebrateTeam,
    CodeWars, 
    EarningsQ2, 
    HPEDiscover, 
    HPENvidia,
    ResourceGroupEvents
} from "./stories/index";

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
            <EarningsQ2 gridArea="story-4" />
            <CelebrateTeam gridArea="story-5" />
            <ResourceGroupEvents gridArea="story-6" />
        </Grid>
    );
}