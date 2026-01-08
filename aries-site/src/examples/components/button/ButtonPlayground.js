import React from 'react';
import { Button } from 'grommet';
import { ComponentPlayground } from '../../../components/content/ComponentPlayground';

// Set display name for code generation
Button.displayName = 'Button';

export const ButtonPlayground = () => {
  const buttonControls = [
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
        { label: 'Add', value: 'Add' },
        { label: 'Edit', value: 'Edit' },
        { label: 'Trash', value: 'Trash' },
        { label: 'Download', value: 'Download' },
        { label: 'Upload', value: 'Upload' },
        { label: 'Save', value: 'Save' },
      ],
    },
    {
      name: 'primary',
      type: 'checkbox',
      label: 'Primary',
    },
    {
      name: 'secondary',
      type: 'checkbox',
      label: 'Secondary',
    },
    {
      name: 'disabled',
      type: 'checkbox',
      label: 'Disabled',
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Active',
    },
    {
      name: 'busy',
      type: 'checkbox',
      label: 'Busy',
    },
    {
      name: 'reverse',
      type: 'checkbox',
      label: 'Reverse',
    },
    {
      name: 'size',
      type: 'select',
      label: 'Size',
      options: ['small', 'medium', 'large'],
    },
    {
      name: 'alignSelf',
      type: 'select',
      label: 'Align Self',
      options: ['start', 'center', 'end', 'stretch'],
    },
    {
      name: 'justify',
      type: 'select',
      label: 'Justify',
      options: ['start', 'center', 'end', 'between', 'around'],
    },
    {
      name: 'gap',
      type: 'select',
      label: 'Gap',
      options: ['xxsmall', 'xsmall', 'small', 'medium', 'large'],
    },
    {
      name: 'badge',
      type: 'checkbox',
      label: 'Badge',
    },
    {
      name: 'tip',
      type: 'text',
      label: 'Tip',
    },
  ];

  const defaultProps = {
    label: 'Button',
    primary: false,
    secondary: false,
    disabled: false,
    active: false,
    busy: false,
    reverse: false,
    size: 'medium',
    alignSelf: undefined,
    justify: undefined,
    gap: undefined,
    badge: false,
    tip: undefined,
    icon: null,
  };

  return (
    <ComponentPlayground
      component={Button}
      defaultProps={defaultProps}
      controls={buttonControls}
    />
  );
};
