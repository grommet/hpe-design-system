import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from 'grommet';
import {
  ariaLabelArg,
  disabledArg,
  labelArg,
  tShirtSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {
    'aria-label': ariaLabelArg,
    disabled: disabledArg,

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
    'aria-label': undefined,
    disabled: false,
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
