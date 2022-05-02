import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export function TextInputDisabledExample() {
  return <Form>
    <FormField
      name="disabled-example"
      label="Label"
      htmlFor="disabled-input"
      disabled
    >
      <TextInput
        name="disabled-example"
        id="disabled-input"
        placeholder="Placeholder text"
        disabled
      />
    </FormField>
  </Form>;
}
