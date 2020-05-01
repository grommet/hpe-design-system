import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputPreview = () => {
  return (
    <Form>
      <FormField
        htmlFor="focus-id"
        name="focus"
        style={{
          boxShadow: '0 0 2px 2px #00E8CF',
          borderRadius: '4px',
        }}
      >
        <TextInput
          aria-label="preview"
          id="focus-id"
          name="focus"
          placeholder="Enter a username"
        />
      </FormField>
    </Form>
  );
};
