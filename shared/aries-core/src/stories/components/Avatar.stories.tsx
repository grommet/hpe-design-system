import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Avatar, AvatarProps } from 'grommet';
import { a11yTitleArg, labelArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    a11yTitle: a11yTitleArg,
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    src: labelArg,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: AvatarProps) => {
    return <Avatar {...args} />;
  },
  args: {
    a11yTitle: 'Image of Shimi',
    src: '//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80',
  },
  name: 'Avatar',
};
