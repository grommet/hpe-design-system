import { Grid, Paragraph, Text } from 'grommet';
import {
  ContentArea,
  ContentLabel,
} from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// 2 columns
const columns = [
  // column 1 has a minimum width of 'small'; 'auto' specifies that width
  // should be determined by its contents.
  ['small', 'auto'],
  // column 2 has a minimum width of medium, but 'flex' allows it to fill
  // any excess width in the grid.
  ['medium', 'flex'],
];

export const MinMaxColumns2 = () => (
  <Grid columns={columns} gap="xsmall">
    <ContentArea title="1" {...contentAreaProps} height="auto">
      <Text color="text-strong">[ 'small', 'auto' ]</Text>
      <ContentArea border fill="vertical" flex width="medium">
        <ContentLabel>
          <Paragraph>
            I'm a 'medium' Box inside of a column set to a minimum width of
            'small', and a max of 'auto' which allow the contents (me) to define
            the column's width.
          </Paragraph>
        </ContentLabel>
      </ContentArea>
    </ContentArea>
    <ContentArea title="2" {...contentAreaProps} height="auto">
      <Text color="text-strong">[ 'medium', 'flex' ]</Text>
      <ContentArea border fill="vertical" flex width="medium">
        <ContentLabel>
          <Paragraph>
            I'm a 'medium' Box inside of a column set to a minimum width of
            'medium', and a max of 'flex' which allows the column to fill the
            remaining width of the grid.
          </Paragraph>
          <Paragraph>
            Resize your browser width to see how the Grid column's behave.
          </Paragraph>
        </ContentLabel>
      </ContentArea>
    </ContentArea>
  </Grid>
);
