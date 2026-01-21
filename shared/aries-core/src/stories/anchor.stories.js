import React from 'react';
import { Anchor, Text } from 'grommet';

const meta = {
  title: 'Anchor',
  component: Anchor,
  argTypes: {
    alignSelf: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    color: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
    gap: {
      control: 'select',
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
      ],
    },
    icon: {
      control: false,
    },
    label: {
      control: 'text',
    },
    margin: {
      control: 'text',
    },
    reverse: {
      control: 'boolean',
    },
    size: {
      control: 'select',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
    },
    weight: {
      control: 'select',
      options: ['normal', 'bold', 100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
  },
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
};

export default meta;

export const Simple = {
  render: args => {
    return (
      <Text>
        Default anchor: <Anchor {...args} />
      </Text>
    );
  },
};
