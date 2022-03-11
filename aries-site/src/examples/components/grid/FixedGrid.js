import { Grid } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';

// Three columns with fixed sizes
const columns = ['xsmall', 'small', 'xxsmall'];
// Two rows with fixed sizes
const rows = ['xsmall', 'small'];

export const FixedGrid = () => (
  <Grid columns={columns} rows={rows} gap="xsmall">
    {/* By default, Grid children fill grid cells left to right. */}
    <ContentArea title="1" background="red" border />
    <ContentArea title="2" background="purple" border />
    <ContentArea title="3" background="green" border />
    <ContentArea title="4" background="orange" border />
    <ContentArea title="5" background="blue" border />
  </Grid>
);
