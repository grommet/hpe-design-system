import React from 'react';
import { Form, FormField, TextArea } from 'grommet';

export function TextAreaExample() {
  return <Form>
    <FormField
      name="textArea-example"
      label="Additional feedback"
      htmlFor="text-area-example"
    >
      <TextArea
        name="textArea-example"
        id="text-area-example"
        placeholder="i.e. ideas, inspirations, or concerns"
      />
    </FormField>
  </Form>;
}
