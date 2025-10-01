import { Box } from 'grommet';
import { Add, Alert, Apps, Archive } from 'grommet-icons';
import { Accessibility } from '@hpe-design/icons-grommet';

export const IconsGrommet = () => (
  <Box pad="large" gap="large">
    <Box direction="row" gap="medium" align="center">
      <Add color="brand" />
      <Alert color="icon-warning" />
      <Apps color="icon-strong" />
      <Archive />
    </Box>
    <Box direction="row" gap="medium" align="center">
      <Accessibility color="brand" size="small" />
      <Accessibility size="xlarge" a11yTitle="Accessibility Icon" color="icon-warning" />
    </Box>
  </Box>
);

export default {
  title: 'HPE Icons',
  parameters: {
    layout: 'fullscreen',
  },
};
