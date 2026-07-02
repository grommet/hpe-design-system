import figma from '@figma/code-connect';
import { Box, Tab } from 'grommet';
import { CircleInformation } from 'grommet-icons';

/**
 * Figma Code Connect mapping for the HPE Design System Tab
 */
figma.connect(
  Tab,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=59-2098',
  {
    props: {
      showIcon: figma.boolean('show Icon', {
        true: <CircleInformation />,
        false: undefined,
      }),
    },
    example: ({ showIcon }) => (
      <Tab title="Label" icon={showIcon}>
        <Box pad="small">Tab content</Box>
      </Tab>
    ),
  },
);
