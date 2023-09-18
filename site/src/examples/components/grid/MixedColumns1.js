import { Grid } from 'grommet';
import {
  ContentArea,
  ContentLabel,
} from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// 3 columns with corresponding widths
const columns = ['small', 'xsmall', 'xsmall'];

export const MixedColumns1 = () => (
  <Grid columns={columns} gap="xsmall">
    <ContentArea title="1" {...contentAreaProps}>
      <ContentLabel>small</ContentLabel>
    </ContentArea>
    <ContentArea title="2" {...contentAreaProps}>
      <ContentLabel>xsmall</ContentLabel>
    </ContentArea>
    <ContentArea title="3" {...contentAreaProps}>
      <ContentLabel>xsmall</ContentLabel>
    </ContentArea>
  </Grid>
);
