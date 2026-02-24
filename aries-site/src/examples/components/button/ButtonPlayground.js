/* eslint-disable react/prop-types, max-len */
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
      displayLabel: 'Button Label',
    },
    {
      name: 'icon',
      type: 'icon',
      displayLabel: 'Icon',
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
      displayLabel: 'Primary',
    },
    {
      name: 'secondary',
      type: 'checkbox',
      displayLabel: 'Secondary',
    },
    {
      name: 'disabled',
      type: 'checkbox',
      displayLabel: 'Disabled',
    },
    {
      name: 'active',
      type: 'checkbox',
      displayLabel: 'Active',
    },
    {
      name: 'busy',
      type: 'checkbox',
      displayLabel: 'Busy',
    },
    {
      name: 'reverse',
      type: 'checkbox',
      displayLabel: 'Reverse',
    },
    {
      name: 'size',
      type: 'select',
      displayLabel: 'Size',
      options: ['small', 'medium', 'large'],
    },
    {
      name: 'alignSelf',
      type: 'select',
      displayLabel: 'Align Self',
      options: ['start', 'center', 'end', 'stretch'],
    },
    {
      name: 'justify',
      type: 'select',
      displayLabel: 'Justify',
      options: ['start', 'center', 'end', 'between', 'around'],
    },
    {
      name: 'gap',
      type: 'select',
      displayLabel: 'Gap',
      options: ['xxsmall', 'xsmall', 'small', 'medium', 'large'],
      showWhen: props => props.icon && props.label,
    },
    {
      name: 'badge',
      type: 'checkbox',
      displayLabel: 'Badge',
    },
    {
      name: 'tip',
      type: 'text',
      displayLabel: 'Tooltip',
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
