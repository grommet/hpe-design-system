import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from 'grommet';
import { placeholderArg, widthArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
    },
    placeholder: placeholderArg,
    readOnlyCopy: {
      control: { type: 'boolean' },
    },
    width: widthArg,
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'TextInput',
  render: args => <TextInput {...args} />,
  args: {
    defaultValue: '',
    placeholder: 'Enter text here...',
    readOnlyCopy: false,
    width: 'medium',
  },
} satisfies Story;
