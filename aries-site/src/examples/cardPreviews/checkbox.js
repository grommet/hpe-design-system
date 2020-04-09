import React from 'react';
import { CheckBox, FormField } from 'grommet';

export const CheckBoxPreview = () => {
  return (
    <FormField fill='horizontal'>
      <CheckBox  aria-label="preview" checked label="Value" />
    </FormField>
  );
};
