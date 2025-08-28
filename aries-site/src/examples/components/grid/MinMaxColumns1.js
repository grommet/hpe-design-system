import { Grid } from 'grommet';
import {
  ContentArea,
  ContentLabel,
} from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// 3 columns
const columns = [
  ['xxsmall', 'xsmall'], // column 1 is able to flex
  ['xsmall', 'small'], // column 2 is able to flex
  'xsmall', // column 3 is always 'small'
];

export const MinMaxColumns1 = () => (
  <Grid columns={columns} gap='3xsmall'>
    <ContentArea title="1" {...contentAreaProps}>
      <ContentLabel>[ 'xxsmall', 'xsmall' ]</ContentLabel>
    </ContentArea>
    <ContentArea title="2" {...contentAreaProps}>
      <ContentLabel>[ 'xsmall', 'small' ]</ContentLabel>
    </ContentArea>
    <ContentArea title="3" {...contentAreaProps}>
      <ContentLabel>'xsmall'</ContentLabel>
    </ContentArea>
  </Grid>
);
