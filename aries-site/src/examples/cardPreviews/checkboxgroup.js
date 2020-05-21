import React from 'react';
import { CheckBoxGroup, FormField } from 'grommet';

export const CheckBoxGroupPreview = () => {
  return (
    <FormField
      name="checkboxgroup-preview"
      fill="horizontal"
      htmlFor="preview-checkboxgroup"
      label="Label"
    >
      <CheckBoxGroup
        options={['Option 1', 'Option 2', 'Option 3']}
        name="checkboxgroup-preview"
        id="simple-checkboxgroup"
      />
    </FormField>
  );
};
