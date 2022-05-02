import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export function TextInputExample() {
  return <Form>
    <FormField name="textInput-example" label="Label" htmlFor="username">
      <TextInput
        name="textInput-example"
        id="username"
        placeholder="Placeholder text"
        type="email"
      />
    </FormField>
  </Form>;
}
