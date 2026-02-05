import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Box, Text } from 'grommet';
import { boxArgs } from '../utils/commonArgs';

const meta = {
  title: 'Components/Box',
  component: Box,
  argTypes: boxArgs,
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

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
} satisfies Story;
