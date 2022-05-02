import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

export function CheckBoxGroupDescriptionExample() {
  return <Form>
      <FormField
        name="checkboxgroup-with-desc"
        htmlFor="checkboxgroup-desc"
        label="CheckBoxGroup Heading"
        help="Description"
      >
        <CheckBoxGroup
          name="checkboxgroup-with-desc"
          id="checkboxgroup-desc"
          options={['Option 1', 'Option 2', 'Option 3']}
        />
      </FormField>
    </Form>;
}
