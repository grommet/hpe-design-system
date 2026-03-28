import React from 'react';
import type { StoryObj } from '@storybook/react-webpack5';
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
    align: undefined,
    alignContent: undefined,
    alignSelf: undefined,
    animation: undefined,
    background: undefined,
    basis: undefined,
    border: false,
    direction: 'column',
    elevation: undefined,
    fill: undefined,
    flex: undefined,
    gap: undefined,
    height: undefined,
    justify: undefined,
    margin: undefined,
    overflow: undefined,
    pad: 'medium',
    round: undefined,
    skeleton: false,
    width: undefined,
    wrap: undefined,
  },
  name: 'Box',
};
