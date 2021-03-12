import React from 'react';
import { Form, FormField, TextArea } from 'grommet';

export const TextAreaDisabledExample = () => (
    <Form>
      <FormField
        label="Additional feedback"
        htmlFor="text-area-disabled-example"
        name="disabled-example"
        disabled
      >
        <TextArea
          name="disabled-example"
          id="text-area-disabled-example"
          placeholder="Placeholder text"
          resize="vertical"
          disabled
        />
      </FormField>
    </Form>
  );
