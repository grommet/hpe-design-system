import React from 'react';
import { TextInput, FormField } from 'grommet';

export const TextInputPreview = () => {
  return (
    <FormField
      style={{ borderRadius: '4px' }}
      fill="horizontal"
      border={{ color: 'focus' }}
    >
      <TextInput focusIndicator placeholder="Placeholder text" />
    </FormField>
  );
};
