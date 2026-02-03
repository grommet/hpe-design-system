import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from 'grommet';
import { iconArg } from '../utils/commonArgs';

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
      description:
        'Custom label to be used by screen readers. When provided, an aria-label will be added to the element.', // TODO: Verify if description is needed, currently doesn't show
    },
    active: {
      control: { type: 'boolean' },
      description: 'Whether the button is active or not.',
    },
    busy: {
      control: { type: 'boolean' },
      description:
        'Whether the button is in a busy state and should display an animation to indicate this.',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled or not.',
    },
    fill: {
      control: { type: 'boolean' },
      options: [true, false, 'horizontal', 'vertical'],
      description:
        'Whether the button expands to fill all of the available width and/or height.',
    },
    href: {
      control: { type: 'text' },
      description: 'If specified, the button will behave like an anchor tag.',
    },
    icon: iconArg,
    label: {
      control: { type: 'text' },
      description: 'The text to be displayed inside the button.',
    },
    // NOTE: onClick is not added to controls as it is a function, I did not add any condition checks with href as it says in the description
    onClick: {
      type: 'function',
      control: false,
      description:
        'Click handler. Not setting this property and not specifying a href causes the Button to be disabled.',
    },
    plain: {
      control: { type: 'boolean' },
      description:
        'Whether this is a plain button with no border or pad. Non plain button will show both pad and border. When using the kind button (i.e. button.default on the theme), the usage of plain is deprecated.',
    },
    reverse: {
      control: { type: 'boolean' },
      description:
        'Whether an icon and label should be reversed so that the icon is at the end of the anchor.',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'small', 'medium', 'large', 'xlarge'],
      description:
        'The possible sizes of Button, that impacts the overall Button padding, border radius, text size and line height. `size` will not impact any icon related sizing.',
    },
    success: {
      control: { type: 'boolean' },
      description:
        'Whether the button is in a success state and should display an animation to indicate this.',
    },
    target: {
      control: { type: 'select' },
      options: ['_self', '_blank', '_parent', '_top'],
      description:
        'Specifies where to display the URL defined in the href property.',
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'reset', 'submit'],
      description:
        'The type of button. Set the type to submit for the default button on forms.',
    },
  },
  // Sets default args for argTypes
  args: {
    a11yTitle: undefined,
    active: false,
    busy: false,
    disabled: false,
    fill: false,
    href: undefined,
    icon: undefined,
    label: '',
    onClick: () => {}, // NOTE: Empty function for onClick to avoid button disabled state, drawback is that this property always appears in the "Code" section
    plain: false,
    reverse: false,
    size: 'medium',
    success: false,
    target: undefined,
    type: 'button',
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary = {
  name: 'Primary',
  // Story specific args
  args: {
    label: 'Primary',
    primary: true,
  },
  render: (args: any) => {
    const IconComponent = args.icon;
    return (
      <Button {...args} icon={IconComponent ? <IconComponent /> : undefined} />
    );
  },
} satisfies Story;

export const Secondary = {
  name: 'Secondary',
  // Story specific args
  args: {
    label: 'Secondary',
    secondary: true,
  },
  render: (args: any) => {
    const IconComponent = args.icon;
    return (
      <Button {...args} icon={IconComponent ? <IconComponent /> : undefined} />
    );
  },
} satisfies Story;

export const Default = {
  name: 'Default',
  // Story specific args
  args: {
    label: 'Default',
  },
  render: (args: any) => {
    const IconComponent = args.icon;
    return (
      <Button {...args} icon={IconComponent ? <IconComponent /> : undefined} />
    );
  },
} satisfies Story;
