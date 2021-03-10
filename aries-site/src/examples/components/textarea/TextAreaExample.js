import React from 'react';
import { Form, FormField, TextArea } from 'grommet';

export const TextAreaExample = () => (
    <Form>
      <FormField
        name="textArea-example"
        label="Additional feedback"
        htmlFor="text-area-example"
      >
        <TextArea
          name="textArea-example"
          id="text-area-example"
          placeholder="i.e. ideas, inspirations, or concerns"
          resize="vertical"
        />
      </FormField>
    </Form>
  );
