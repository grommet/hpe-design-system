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
    src: 'https://gravatar.com/enthusiastmindfully0911fd96ed',
  },
  name: 'Avatar',
};
