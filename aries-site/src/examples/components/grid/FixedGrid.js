import { Box, Grid } from 'grommet';

const columns = ['xsmall', 'xxsmall', 'xxsmall'];
const rows = ['xsmall', 'small'];

export const FixedGrid = () => (
  <Grid columns={columns} rows={rows}>
    <Box>mamma</Box>
    <Box>tiger</Box>
    <Box>kitty</Box>
    <Box>kat</Box>
  </Grid>
);
