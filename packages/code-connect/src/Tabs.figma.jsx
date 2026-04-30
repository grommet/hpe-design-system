import figma from '@figma/code-connect';
import { Box, Tab, Tabs } from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Tabs
 */
figma.connect(
  Tabs,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=59-2087',
  {
    props: {
      overflow: figma.enum('has Overflow', { True: 'auto' }),
    },
    example: ({ overflow }) => (
      <Box overflow={overflow}>
        <Tabs>
          <Tab title="Tab 1">
            <Box pad="small">Tab 1 content</Box>
          </Tab>
          <Tab title="Tab 2">
            <Box pad="small">Tab 2 content</Box>
          </Tab>
          <Tab title="Tab 3">
            <Box pad="small">Tab 3 content</Box>
          </Tab>
        </Tabs>
      </Box>
    ),
  },
);
