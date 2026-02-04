import React from 'react';
import { Box, Text } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

export const boxArgTypes = boxArgs;

const meta = {
  title: 'Components/Box',
  component: Box,
  argTypes: boxArgTypes,
};

export default meta;

export const Default = {
  render: args => (
    <Box {...args}>
      <Text>First item</Text>
      <Text>Second item</Text>
      <Text>Third item</Text>
    </Box>
  ),
  args: {
    direction: 'column',
    pad: 'medium',
  },
  name: 'Box',
};
