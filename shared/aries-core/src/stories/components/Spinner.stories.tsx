import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { Spinner } from 'grommet';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'xlarge'],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Spinner',
  // eslint-disable-next-line grommet/spinner-message -- message is passed via args spread
  render: args => <Spinner {...args} />,
  args: {
    size: 'medium',
  },
} satisfies Story;
