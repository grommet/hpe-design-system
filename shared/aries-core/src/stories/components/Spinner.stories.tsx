import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from 'grommet';
import { sizeArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  argTypes: {
    size: sizeArg,
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Spinner',
  render: args => <Spinner {...args} />,
  args: {
    size: 'medium',
  },
} satisfies Story;
