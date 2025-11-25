import React from 'react';
import { Box, Text } from 'grommet';

const meta = {
  title: 'Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const BoxStorybookExample = {
  render: (args, { globals }) => {
    const theme = globals?.theme;
    const borderColor = theme === 'grommet' ? 'accent-1' : 'border-default';

    return (
      <Box direction="row-responsive" gap="medium" align="center">
        <Box
          align="center"
          border={{ color: borderColor, size: 'medium' }}
          pad="medium"
          round="medium"
          width="medium"
        >
          <Text>
            Boxes are containers that drive the layout of your content.
          </Text>
        </Box>
      </Box>
    );
  },
  parameters: {
    docs: {
      codePanel: true,
      source: {
        transform: (code, storyContext) => {
          const theme = storyContext.globals?.theme;
          const borderColor =
            theme === 'grommet' ? 'accent-1' : 'border-default';

          // Replace both possible values
          let transformedCode = code.replace(/border-default/g, borderColor);
          transformedCode = transformedCode.replace(/accent-1/g, borderColor);

          return transformedCode;
        },
        state: 'open',
      },
    },
  },
};
