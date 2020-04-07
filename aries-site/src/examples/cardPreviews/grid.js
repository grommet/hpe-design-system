import React from 'react';
import { Grid, Box } from 'grommet';

export const GridPreview = () => {
  return (
    <Grid
      fill
      columns={{
        count: 4,
        size: 'auto',
      }}
      gap="small"
    >
      <Box fill background="background-back"/>
      <Box background="background-back"/>
      <Box background="background-back"/>
      <Box background="background-back"/>
    </Grid>
  );
};
