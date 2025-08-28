import { Grid } from 'grommet';
import {
  ContentArea,
  ContentLabel,
} from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// 2 columns with corresponding proportional widths
const columns = ['2/3', '1/3'];

export const MixedColumns2 = () => (
  <Grid columns={columns} gap='3xsmall'>
    <ContentArea title="1" {...contentAreaProps}>
      <ContentLabel>2/3</ContentLabel>
    </ContentArea>
    <ContentArea title="2" {...contentAreaProps}>
      <ContentLabel>1/3</ContentLabel>
    </ContentArea>
  </Grid>
);
