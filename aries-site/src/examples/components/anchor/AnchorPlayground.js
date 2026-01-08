import React from 'react';
import { Anchor } from 'grommet';
import {
  ComponentPlayground,
} from '../../../components/content/ComponentPlayground';

export const AnchorPlayground = () => {
  const anchorControls = [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
    },
    {
      name: 'icon',
      type: 'icon',
      label: 'Icon',
      options: [
        { label: 'None', value: null },
        { label: 'NewWindow', value: 'NewWindow' },
        { label: 'LinkNext', value: 'LinkNext' },
        { label: 'LinkPrevious', value: 'LinkPrevious' },
      ],
    },
    {
      name: 'size',
      type: 'select',
      label: 'Size',
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge'],
    },
    {
      name: 'disabled',
      type: 'checkbox',
      label: 'Disabled',
    },
  ];

  const defaultProps = {
    label: 'Anchor',
    href: '#',
    icon: null,
    size: 'medium',
    disabled: false,
  };

  // Set display name for code generation
  Anchor.displayName = 'Anchor';

  return (
    <ComponentPlayground
      component={Anchor}
      defaultProps={defaultProps}
      controls={anchorControls}
    />
  );
};
