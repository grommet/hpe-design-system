import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from 'grommet';
import {
  a11yTitleArg,
  placeholderArg,
  textSizesArg,
  widthArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    a11yTitle: a11yTitleArg,
    defaultValue: {
      control: { type: 'text' },
    },
    placeholder: placeholderArg,
    readOnlyCopy: {
      control: { type: 'boolean' },
    },
    size: textSizesArg,
    width: widthArg,
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'TextInput',
  render: args => <TextInput {...args} />,
  args: {
    a11yTitle: 'Text input field',
    defaultValue: '',
    placeholder: 'Enter text here...',
    readOnlyCopy: false,
    size: 'medium',
    width: 'medium',
  },
} satisfies Story;
