import React from 'react';
import { CheckBox, FormField } from 'grommet';

export const CheckBoxPreview = () => {
  return (
    <FormField fill='horizontal'>
      <CheckBox checked label="Value" />
    </FormField>
  );
};
