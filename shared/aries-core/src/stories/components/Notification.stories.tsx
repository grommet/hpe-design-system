import type { Meta, StoryObj } from '@storybook/react';
import { Notification } from 'grommet';
import { iconArg, labelArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Notification',
  component: Notification,
  argTypes: {
    actions: {
      control: { type: 'object' },
    },
    global: {
      control: { type: 'boolean' },
    },
    icon: iconArg,
    message: {
      control: { type: 'text' },
    },
    status: {
      control: { type: 'select' },
      options: ['normal', 'warning', 'info', 'critical'],
    },
    title: labelArg,
    toast: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Notification',
  render: args => <Notification {...args} />,
  args: {
    actions: [
      { label: 'Renew Subscription', href: '/renew' },
      { label: 'View Details', href: '/details' },
    ],
    global: false,
    icon: undefined,
    message: 'This is a notification message',
    status: 'info',
    title: 'Notification Title',
    toast: false,
  },
} satisfies Story;
