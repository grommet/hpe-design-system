import { Box } from 'grommet';
import { ContentArea } from '../page-layouts/anatomy/components';

export const ContainerDrivenLayout = () => (
  <Box direction="row-responsive" gap="medium" border>
    <ContentArea border height="small" width="small" />
    <ContentArea border height="small" width="small" />
    <ContentArea border height="small" width="small" />
    <ContentArea border height="small" width="small" />
  </Box>
);
