import React from 'react';
import { TextInput, FormField } from 'grommet';

export const TextInputPreview = () => {
  return (
    <FormField
      style={{
        boxShadow: '0 0 2px 2px #00E8CF',
        borderRadius: '4px',
      }}
    >
      <TextInput
        aria-label="preview"
        id="focus-id"
        name="focus"
        placeholder="Enter a username"
      />
    </FormField>
  );
};
