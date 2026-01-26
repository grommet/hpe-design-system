import React from 'react';
import { Box, Text } from 'grommet';
import {
  backgroundColors,
  tShirtSizes,
  spacingSizes,
  containerSizes,
  radiusSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    background: {
      control: { type: 'select' },
      options: backgroundColors,
    },
    border: {
      control: { type: 'boolean' },
    },
    direction: {
      control: { type: 'select' },
      options: ['row', 'column', 'row-responsive'],
    },
    elevation: {
      control: { type: 'select' },
      options: tShirtSizes,
    },
    fill: {
      control: { type: 'select' },
      options: [true, false, 'horizontal', 'vertical'],
    },
    gap: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    height: {
      control: { type: 'select' },
      options: containerSizes,
    },
    pad: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    round: {
      control: { type: 'select' },
      options: radiusSizes,
    },
    skeleton: {
      control: { type: 'boolean' },
    },
    width: {
      control: { type: 'select' },
      options: containerSizes,
    },
  },
};

export default meta;

export const Default = {
  render: args => {
    return (
      <Box {...args}>
        <Text>First item</Text>
        <Text>Second item</Text>
        <Text>Third item</Text>
      </Box>
    );
  },
  args: {
    direction: 'column',
    pad: 'medium',
  },
  name: 'Box',
};
