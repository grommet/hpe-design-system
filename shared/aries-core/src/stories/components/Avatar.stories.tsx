import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from 'grommet';
import { ariaLabelArg, labelArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    'aria-label': ariaLabelArg,
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    src: labelArg,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Avatar',
  render: args => <Avatar {...args} />,
  args: {
    'aria-label': 'Image of Jessica',
    size: 'medium',
    src: 'https://1.gravatar.com/avatar/5134a384e69b1f9e2ff2f792145b240d714b79c4a0d49ae02874eb5e96802fd8?size=256&d=initials',
  },
} satisfies Story;
