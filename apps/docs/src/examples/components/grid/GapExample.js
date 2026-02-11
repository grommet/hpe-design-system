import { Grid } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps as props } from './utils';

const contentAreaProps = { ...props, height: undefined };

const columns = ['medium', '3xsmall'];
const rows = ['3xsmall', '3xsmall'];
const gap = { column: 'medium', row: '3xsmall' };

export const GapExample = () => (
  <Grid columns={columns} rows={rows} gap={gap}>
    <ContentArea title="1" {...contentAreaProps} />
    <ContentArea title="2" {...contentAreaProps} />
    <ContentArea title="3" {...contentAreaProps} />
    <ContentArea title="4" {...contentAreaProps} />
  </Grid>
);
