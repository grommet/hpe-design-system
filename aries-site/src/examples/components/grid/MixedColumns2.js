import { Box, Grid, Text } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// 2 columns with corresponding proportional widths
const columns = ['2/3', '1/3'];

export const MixedColumns2 = () => (
  <Grid columns={columns} gap="xsmall">
    <ContentArea title="1" {...contentAreaProps}>
      <Box align="center" justify="center" fill>
        <Text color="text-strong">2/3</Text>
      </Box>
    </ContentArea>
    <ContentArea title="2" {...contentAreaProps}>
      <Box align="center" justify="center" fill>
        <Text color="text-strong">1/3</Text>
      </Box>
    </ContentArea>
  </Grid>
);
