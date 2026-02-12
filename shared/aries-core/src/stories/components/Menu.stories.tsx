import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from 'grommet';
import {
  a11yTitleArg,
  disabledArg,
  labelArg,
  tShirtSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    a11yTitle: a11yTitleArg,
    disabled: disabledArg,
    icon: {
      control: { type: 'boolean' },
    },
    items: {
      control: { type: 'object' },
    },
    label: labelArg,
    size: {
      control: { type: 'select' },
      options: tShirtSizes,
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Menu',
  // Story specific args, sets default args for argTypes
  args: {
    a11yTitle: undefined,
    disabled: false,
    icon: false,
    items: [
      { label: 'Profile', onClick: () => {} },
      { label: 'Settings', onClick: () => {} },
      { label: 'FAQ', onClick: () => {} },
    ],
    label: 'Menu',
    size: 'medium',
  },
  render: (args: any) => {
    return <Menu {...args} width="large" />;
  },
} satisfies Story;
