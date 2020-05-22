import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupPreview = () => {
  return (
    <Form>
      <FormField
        name="checkboxgroup-preview"
        fill="horizontal"
        htmlFor="preview-checkboxgroup"
        label="Label"
      >
        <CheckBoxGroup
          options={['Option 1', 'Option 2', 'Option 3']}
          value={['Option 2']}
          name="checkboxgroup-preview"
          id="simple-checkboxgroup"
        />
      </FormField>
    </Form>
  );
};
