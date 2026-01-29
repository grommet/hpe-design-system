import React from 'react';
import { CheckBox, FormField } from 'grommet';

export const CheckBoxPreview = () => (
  <FormField
    name="checkbox-preview"
    htmlFor="checkbox-preview"
    fill="horizontal"
    tabIndex={-1}
  >
    <CheckBox
      name="checkbox-preview"
      id="checkbox-preview"
      aria-label="preview"
      checked
      label="Value"
      tabIndex={-1}
    />
  </FormField>
);
