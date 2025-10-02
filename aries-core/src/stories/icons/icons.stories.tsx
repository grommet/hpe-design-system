import { Box } from 'grommet';
import { Add, Alert, Apps, Archive } from 'grommet-icons';
import { Accessibility } from '@hpe-design/icons-grommet';
import { GenAI } from '../../../../packages/icons/grommet-icons-test/dist/es6';

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
      <GenAI color="brand" size="small" height="medium"/>
      <GenAI size="xlarge" a11yTitle="AI Generation Icon" color="icon-warning" />
      <GenAI size="xlarge" a11yTitle="AI Generation Icon" color="icon-strong" />
      <GenAI size="xlarge" a11yTitle="AI Generation Icon" color="icon-default" />
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
