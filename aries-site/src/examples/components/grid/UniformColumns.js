import { Grid } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// Specifying a single string will repeat multiple columns of that size, as
// long as there is room for more.
const columns = 'xsmall';

export const UniformColumns = () => (
  <Grid columns={columns} gap='3xsmall'>
    <ContentArea title="1" {...contentAreaProps} />
    <ContentArea title="2" {...contentAreaProps} />
    <ContentArea title="3" {...contentAreaProps} />
    <ContentArea title="4" {...contentAreaProps} />
    <ContentArea title="5" {...contentAreaProps} />
  </Grid>
);
