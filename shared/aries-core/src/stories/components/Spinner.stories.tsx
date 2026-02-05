import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Spinner, SpinnerProps } from 'grommet';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: SpinnerProps) => {
    return <Spinner {...args} />;
  },
  name: 'Spinner',
};
