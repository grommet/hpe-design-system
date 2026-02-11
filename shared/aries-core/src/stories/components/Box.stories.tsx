import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Box, Text, BoxTypes } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

const meta = {
  title: 'Components/Box',
  component: Box,
  argTypes: boxArgs,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: BoxTypes) => (
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
