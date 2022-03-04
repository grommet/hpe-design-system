import { Box, Grid, Text } from 'grommet';
import { ContentArea } from '../../templates/page-layouts/anatomy/components';
import { contentAreaProps } from './utils';

// 3 columns with corresponding widths
const columns = ['small', 'xsmall', 'xsmall'];

export const MixedColumns1 = () => (
  <Grid columns={columns} gap="xsmall">
    <ContentArea title="1" {...contentAreaProps}>
      <Box align="center" justify="center" fill>
        <Text color="text-strong">small</Text>
      </Box>
    </ContentArea>
    <ContentArea title="2" {...contentAreaProps}>
      <Box align="center" justify="center" fill>
        <Text color="text-strong">xsmall</Text>
      </Box>
    </ContentArea>
    <ContentArea title="3" {...contentAreaProps}>
      <Box align="center" justify="center" fill>
        <Text color="text-strong">xsmall</Text>
      </Box>
    </ContentArea>
  </Grid>
);
