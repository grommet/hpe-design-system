import { Box } from 'grommet';
import { Add, Alert, Apps, Archive } from 'grommet-icons';
import { Accessibility } from '@hpe-design/icons-grommet';
import { AIGen } from '@hpe-design/grommet-icons-test';

export const IconsGrommet = () => {
  return (
    <Box pad="large" gap="large">
      <Box direction="row" gap="medium" align="center">
        <Add color="brand" />
        <Alert color="icon-warning" />
        <Apps color="icon-strong" />
      <Archive />
    </Box>
    <Box direction="row" gap="medium" align="center">
      <Accessibility color="brand" size="small" height="medium"/>
      <Accessibility size="xlarge" a11yTitle="Accessibility Icon" color="icon-warning" />
      <Accessibility size="xlarge" a11yTitle="Accessibility Icon" color="icon-strong" />
      <Accessibility size="xlarge" a11yTitle="Accessibility Icon" color="icon-default" />
    </Box>
    <Box direction="row" gap="medium" align="center">
      <AIGen color="brand" size="small" height="medium"/>
      <AIGen size="xlarge" a11yTitle="AI Generation Icon" color="icon-warning" />
      <AIGen size="xlarge" a11yTitle="AI Generation Icon" color="icon-strong" />
      <AIGen size="xlarge" a11yTitle="AI Generation Icon" color="icon-default" />
    </Box>
  </Box>
);
};

export default {
  title: 'HPE Icons',
  parameters: {
    layout: 'fullscreen',
  },
};
