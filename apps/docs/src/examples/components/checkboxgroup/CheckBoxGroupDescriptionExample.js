import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupDescriptionExample = () => (
  <Form>
    <FormField
      name="checkboxgroup-with-desc"
      htmlFor="checkboxgroup-desc"
      label="CheckBoxGroup heading"
      help="Description"
    >
      <CheckBoxGroup
        name="checkboxgroup-with-desc"
        id="checkboxgroup-desc"
        options={['Option 1', 'Option 2', 'Option 3']}
      />
    </FormField>
  </Form>
);
