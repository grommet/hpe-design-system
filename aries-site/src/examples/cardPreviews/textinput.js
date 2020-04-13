import React from 'react';
import { TextInput, FormField } from 'grommet';

export const TextInputPreview = () => {
  return (
    <FormField
      style={{ borderRadius: '4px' }}
      fill="horizontal"
      border={{ color: 'focus', size: 'small' }}
    >
      <TextInput
        aria-label="preview"
        focusIndicator
        placeholder="Placeholder text"
      />
    </FormField>
  );
};
