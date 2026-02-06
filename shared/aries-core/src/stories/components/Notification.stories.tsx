import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Notification, NotificationProps } from 'grommet';
import { iconArg, labelArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Notification',
  component: Notification,
  argTypes: {
    global: {
      control: { type: 'boolean' },
    },
    icon: iconArg,
    status: {
      control: { type: 'select' },
      options: ['normal', 'warning', 'info', 'critical'],
    },
    title: labelArg,
    toast: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: NotificationProps) => {
    return <Notification {...args} />;
  },
  args: {
    title: 'Notification Title',
    status: 'info',
    global: false,
    toast: false,
  },
  name: 'Notification',
};
