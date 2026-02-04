import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'grommet';
import { tShirtSizes, iconArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Button',
  component: Button,
  // TODO: Verify if 'centered' is appropriate for Button stories, currently does not work as expected due to theme overrides
  // parameters: {
  //   layout: 'centered',
  // },
  argTypes: {
    a11yTitle: {
      control: { type: 'text' },
    },
    active: {
      control: { type: 'boolean' },
    },
    busy: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    fill: {
      control: { type: 'boolean' },
      options: [true, false, 'horizontal', 'vertical'],
    },
    href: {
      control: { type: 'text' },
    },
    icon: iconArg,
    kind: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'default'],
    },
    label: {
      control: { type: 'text' },
    },
    // NOTE: onClick is not added to controls as it is a function, I did not add any condition checks with href as it says in the description
    onClick: {
      type: 'function',
      control: false,
    },
    reverse: {
      control: { type: 'boolean' },
    },
    size: {
      control: { type: 'select' },
      options: tShirtSizes,
    },
    success: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Button',
  // Sets default args for argTypes, story specific args
  args: {
    a11yTitle: undefined,
    active: false,
    busy: false,
    disabled: false,
    fill: false,
    href: undefined,
    icon: undefined,
    kind: 'primary',
    label: 'Button',
    onClick: () => {}, // NOTE: Empty function for onClick to avoid button disabled state, drawback is that this property always appears in the "Code" section
    reverse: false,
    size: 'medium',
    success: false,
  },
  render: (args: any) => {
    return <Button {...args} />;
  },
} satisfies Story;
