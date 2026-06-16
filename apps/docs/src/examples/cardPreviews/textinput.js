import React from 'react';
import { Form, FormField, TextInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const TextInputPreview = () => {
  const ref = useInert();

  return (
    <Form ref={ref}>
      <FormField htmlFor="focus-id" name="focus">
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