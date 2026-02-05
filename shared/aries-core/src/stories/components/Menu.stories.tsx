import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from 'grommet';
import {
  alignArg,
  justifyContentArg,
  spacingSizes,
  tShirtSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  // TODO: Verify if 'centered' is appropriate for Button stories, currently does not work as expected due to theme overrides
  // parameters: {
  //   layout: 'centered',
  // },
  argTypes: {
    a11yTitle: {
      control: { type: 'text' },
    },
    alignSelf: alignArg,
    dropProps: {
      control: { type: 'object' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'boolean' },
    },
    items: {
      control: { type: 'object' },
    },
    justifyContent: justifyContentArg,
    label: {
      control: { type: 'text' },
    },
    margin: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    open: {
      control: { type: 'boolean' },
    },
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
    alignSelf: 'start',
    disabled: false,
    dropProps: {
      align: { top: 'bottom', left: 'left' },
    },
    icon: false,
    items: [
      { label: 'Profile', onClick: () => {} },
      { label: 'Settings', onClick: () => {} },
      { label: 'FAQ', onClick: () => {} },
    ],
    justifyContent: 'start',
    label: 'Menu',
    margin: 'none',
    open: false,
    size: 'medium',
  },
  render: (args: any) => {
    return <Menu {...args} width="large" />;
  },
} satisfies Story;
