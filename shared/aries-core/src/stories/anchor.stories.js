// import React from 'react';
import { Anchor } from 'grommet';

const sizes = ['small', 'medium', 'large', 'xlarge'];

const meta = {
  title: 'AnchorExample',
  component: Anchor,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: sizes, // An array of serializable values
      //   mapping: arrows, 
      // // Maps serializable option values to complex arg values
        control: {
          type: 'select', 
      // Type 'select' is automatically inferred when 'options' is defined
          // labels: {
          //   // 'labels' maps option values to string labels
          //   ArrowUp: 'Up',
          //   ArrowDown: 'Down',
          //   ArrowLeft: 'Left',
          //   ArrowRight: 'Right',
          // },
        },
    },
  },
};

export default meta;

export const AnchorExample = {
  //   render: () => <Anchor />,
  args: {
    href: 'https://example.com',
    label: 'Example Anchor',
    size: 'small',
    disabled: false,
  },
};
