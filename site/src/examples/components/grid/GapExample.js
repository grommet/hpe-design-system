import { Grid } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps as props } from './utils';

const contentAreaProps = { ...props, height: undefined };

const columns = ['medium', 'xsmall'];
const rows = ['xsmall', 'xsmall'];
const gap = { column: 'medium', row: 'xsmall' };

export const GapExample = () => (
  <Grid columns={columns} rows={rows} gap={gap}>
    <ContentArea title="1" {...contentAreaProps} />
    <ContentArea title="2" {...contentAreaProps} />
    <ContentArea title="3" {...contentAreaProps} />
    <ContentArea title="4" {...contentAreaProps} />
  </Grid>
);
