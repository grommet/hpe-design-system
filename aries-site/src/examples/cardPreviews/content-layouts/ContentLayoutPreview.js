import React from 'react';
import { Box, Grid } from 'grommet';

const GridRegion = () => <Box background="blue!" round="xsmall" />;

export const ContentLayoutPreview = () => (
  <Grid columns={['3/4', '1/4']} gap="small" fill>
    <Grid gap="small">
      <GridRegion />
      <Grid columns={['auto', 'auto']} gap="small">
        <GridRegion />
        <Grid>
          <GridRegion />
        </Grid>
      </Grid>
    </Grid>
    <Grid>
      <GridRegion />
    </Grid>
  </Grid>
);
