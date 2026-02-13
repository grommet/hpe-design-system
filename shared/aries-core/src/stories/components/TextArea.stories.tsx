import type { Meta, StoryObj } from '@storybook/react';
import { TextArea } from 'grommet';
import { placeholderArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/TextArea',
  component: TextArea,
  argTypes: {
    defaultValue: {
      control: { type: 'text' },
    },
    fill: {
      control: { type: 'boolean' },
    },
    placeholder: placeholderArg,
    resize: {
      control: { type: 'select' },
      options: [true, false, 'vertical', 'horizontal'],
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'TextArea',
  render: args => <TextArea {...args} />,
  args: {
    defaultValue: '',
    fill: false,
    placeholder: 'Enter multiple lines of text here...',
    resize: true,
  },
} satisfies Story;
