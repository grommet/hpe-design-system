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
      hasOverflow: figma.enum('has Overflow', {
        True: true,
        False: false,
      }),
      containerWidth: figma.enum('has Overflow', {
        True: '360px',
        False: '100%',
      }),
      tabTitles: figma.enum('has Overflow', {
        True: ['Label', 'Label', 'Label', 'Label', 'Long Label'],
        False: ['Label', 'Label', 'Label', 'Label', 'Label'],
      }),
    },
    example: ({ hasOverflow, containerWidth, tabTitles }) => (
      <Box width={containerWidth} overflow="hidden">
        <Tabs flex={hasOverflow}>
          {tabTitles.map((title, index) => (
            <Tab key={`${title}-${index}`} title={title}>
              <Box pad="small" />
            </Tab>
          ))}
        </Tabs>
      </Box>
    ),
  },
);
