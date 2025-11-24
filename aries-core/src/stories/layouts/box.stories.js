import React from 'react';
import { Box, Text } from 'grommet';

const meta = {
  title: 'Layouts/Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

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
  parameters: {
    docs: {
      source: {
        state: 'open',
      },
    },
  },
};
