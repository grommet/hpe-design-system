import React from 'react';
import type { StoryObj } from '@storybook/react';
import { TextArea, TextAreaProps } from 'grommet';
import {
  a11yTitleArg,
  fillArg,
  onChangeArg,
  placeholderArg,
  textSizesArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    a11yTitle: a11yTitleArg,
    fill: fillArg,
    name: {
      control: { type: 'text' },
    },
    onChange: onChangeArg,
    placeholder: placeholderArg,
    resize: {
      control: { type: 'select' },
      options: [true, false, 'vertical', 'horizontal'],
    },
    size: textSizesArg,
    value: {
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: TextAreaProps) => {
    return <TextArea {...args} />;
  },
  args: {
    placeholder: 'Enter multiple lines of text here...',
    a11yTitle: 'Text area input field',
    fill: false,
    name: 'textArea',
    resize: true,
    size: 'medium',
    value: '',
  },
  name: 'TextArea',
};
