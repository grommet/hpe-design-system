import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TextInput } from 'grommet';
import { Search } from '@hpe-design/icons-grommet';
import {
  iconArg,
  placeholderArg,
  reverseArg,
  heightArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    defaultSuggestion: {
      control: { type: 'number' },
    },
    dropHeight: heightArg,
    icon: iconArg,
    placeholder: placeholderArg,
    reverse: reverseArg,
    suggestions: {
      control: { type: 'object' },
    },
    textAlign: {
      control: { type: 'select' },
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SearchExample = {
  name: 'Search',
  render: args => <TextInput {...args} />,
  args: {
    defaultSuggestion: undefined,
    dropHeight: undefined,
    icon: <Search />,
    placeholder: 'Search',
    reverse: true,
    suggestions: ['Suggestion 1', 'Suggestion 2', 'Suggestion 3'],
    textAlign: undefined,
  },
} satisfies Story;
