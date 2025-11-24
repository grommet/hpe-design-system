import React from 'react';
import { Box, Text } from 'grommet';

const meta = {
  title: 'Layouts/Box',
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
      <Box
        align="center"
        justify="center"
        border={{ color: 'border-default', size: 'medium' }}
        pad="xlarge"
        round="medium"
        width="medium"
        height="medium"
      >
        <Text>Boxes can be various sizes.</Text>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Box direction="row-responsive" gap="medium" align="center">
  <Box
    align="center"
    border={{ color: 'border-default', size: 'medium' }}
    pad="xlarge"
    round="medium"
    width="medium"
  >
    <Text>Boxes are containers that drive the layout of your content.</Text>
  </Box>
  <Box
    align="center"
    justify="center"
    border={{ color: 'border-default', size: 'medium' }}
    pad="xlarge"
    round="medium"
    width="medium"
    height="medium"
  >
    <Text>Boxes can be various sizes.</Text>
  </Box>
</Box>`,
        state: 'open',
      },
    },
  },
};
