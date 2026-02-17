import React from 'react';
import { Box, Grid } from 'grommet';

const GridRegion = () => <Box background="brand" round="xsmall" />;

export const ContentLayoutPreview = () => (
  <Grid columns={['3/4', '1/4']} gap="xsmall" fill>
    <Grid gap="xsmall">
      <GridRegion />
      <Grid columns={['auto', 'auto']} gap="xsmall">
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
