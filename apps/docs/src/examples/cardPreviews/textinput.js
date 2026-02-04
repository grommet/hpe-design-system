import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputPreview = () => (
  <Form>
    <FormField htmlFor="focus-id" name="focus">
      <TextInput
        aria-label="preview"
        id="focus-id"
        name="focus"
        placeholder="Enter a username"
        tabIndex={-1}
      />
    </FormField>
  </Form>
);
