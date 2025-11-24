import React from 'react';
import { Box, Text } from 'grommet';

export const BoxStorybookExample = {
  render: () => (
    <Box direction="row-responsive" gap="medium" align="center">
      <Box
        align="center"
        border={{ color: 'border-default', size: 'medium' }}
        pad="xlarge"
        round="medium"
        width="medium"
      >
        <Text>Boxes are containers that drive the layout of your content.</Text>
      </Box>
    </Box>
  ),
};

// transform: (code, storyContext) => {
//   const theme = storyContext.globals?.theme;
//   const borderColor =
//     theme === 'grommet' ? 'accent-1' : 'border-default';
//   return code.replace(/border-default|accent-1/g, borderColor);
// },

export default {
  title: 'Box',
  parameters: {
    layout: 'centered',
    docs: {
      codePanel: true,
    },
  },
};
