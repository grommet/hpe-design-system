import { Box } from 'grommet';
import { Add, Alert, Apps, Archive, StatusUnknown } from 'grommet-icons';
import {
  AIGenFill,
  StatusCritical,
  StatusGood,
  StatusInfo,
  StatusWarning,
} from '@hpe-design/icons-grommet';

export const IconsGrommet = () => {
  return (
    <Box pad="large" gap="large">
      <Box direction="row" gap="medium" align="center">
        <AIGenFill size="xsmall" />
        <AIGenFill size="small" />
        <AIGenFill size="medium" />
        <AIGenFill size="large" />
        <AIGenFill size="xlarge" />
        <AIGenFill size="xxlarge" />
      </Box>
      <Box direction="row" gap="medium" align="center">
        <StatusGood
          size="xxlarge"
          a11yTitle="AI Generation Icon"
          color="icon-ok"
        />
        <StatusWarning
          size="xxlarge"
          a11yTitle="AI Generation Icon"
          color="icon-warning"
        />
        <StatusCritical
          size="xxlarge"
          a11yTitle="AI Generation Icon"
          color="icon-critical"
        />
        <StatusInfo
          size="xxlarge"
          a11yTitle="AI Generation Icon"
          color="icon-info"
        />
        <StatusUnknown
          size="xxlarge"
          a11yTitle="AI Generation Icon"
          color="icon-unknown"
        />
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
