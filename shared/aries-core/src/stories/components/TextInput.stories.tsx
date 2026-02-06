import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TextInput, TextInputProps } from 'grommet';
import {
  a11yTitleArg,
  onChangeArg,
  placeholderArg,
  textSizesArg,
  widthArg,
} from '../utils/commonArgs';
import { on } from 'events';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    a11yTitle: a11yTitleArg,
    placeholder: placeholderArg,
    onChange: onChangeArg,
    readOnlyCopy: {
      control: { type: 'boolean' },
    },
    size: textSizesArg,
    width: widthArg,
    value: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: TextInputProps) => {
    return <TextInput {...args} />;
  },
  args: {
    placeholder: 'Enter text here...',
    a11yTitle: 'Text input field',
    readOnlyCopy: false,
    size: 'medium',
    value: '',
    width: 'medium',
  },
  name: 'TextInput',
};
