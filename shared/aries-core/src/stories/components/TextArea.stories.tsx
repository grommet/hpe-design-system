import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from 'grommet';
import {
  a11yTitleArg,
  fillArg,
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
    onChange: {
      control: false,
      type: 'function',
    },
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
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'TextArea',
  render: args => <TextArea {...args} />,
  args: {
    a11yTitle: 'Text area input field',
    fill: false,
    name: 'textArea',
    onChange: undefined,
    placeholder: 'Enter multiple lines of text here...',
    resize: true,
    size: 'medium',
    value: '',
  },
} satisfies Story;
