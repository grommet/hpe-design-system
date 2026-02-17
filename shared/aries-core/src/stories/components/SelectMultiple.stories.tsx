import type { Meta, StoryObj } from '@storybook/react';
import { SelectMultiple } from 'grommet';
import {
  a11yTitleArg,
  disabledArg,
  textSizesArg,
  placeholderArg,
  marginArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/SelectMultiple',
  component: SelectMultiple,
  argTypes: {
    a11yTitle: a11yTitleArg,
    defaultValue: {
      control: { type: 'object' },
      description: 'Initially selected value.',
    },
    disabled: disabledArg,
    help: {
      control: { type: 'text' },
      description:
        'Optional help text to display above the options in the drop.',
    },
    limit: {
      control: { type: 'number' },
      description: 'The maximum number of options that can be selected.',
    },
    margin: marginArg,
    onSearch: {
      action: 'searched',
      description:
        'Function that will be called when the user types in the search input.',
    },
    open: {
      control: { type: 'boolean' },
    },
    options: {
      control: { type: 'object' },
    },
    placeholder: placeholderArg,
    searchPlaceholder: {
      control: { type: 'text' },
      description:
        'Placeholder text to use in the search box when the search input is empty.',
    },
    showSelectedInline: {
      control: { type: 'boolean' },
      description:
        'Whether selections should be displayed at the input level of the component.',
    },
    sortSelectedOnClose: {
      control: { type: 'boolean' },
      description:
        'Whether selections should be sorted with selected items displayed at the top of the list after closing and reopening the drop.',
    },
  },
} satisfies Meta<typeof SelectMultiple>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'SelectMultiple',
  render: args => <SelectMultiple {...args} />,
  args: {
    a11yTitle: 'Multiple selection',
    defaultValue: undefined,
    disabled: false,
    help: undefined,
    limit: undefined,
    margin: undefined,
    onOpen: undefined,
    onSearch: undefined,
    open: false,
    options: [
      'Extra Small',
      'Small',
      'Medium',
      'Large',
      'Extra Large',
      'XXL',
      '3XL',
      '4XL',
    ],
    placeholder: 'Select multiple options',
    searchPlaceholder: 'Search options',
    showSelectedInline: true,
    sortSelectedOnClose: false,
  },
} satisfies Story;
