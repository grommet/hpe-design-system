import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputPreview = () => (
    <Form>
      <FormField htmlFor="focus-id" name="focus">
        <TextInput
          aria-label="preview"
          id="focus-id"
          name="focus"
          style={{
            boxShadow: '0 0 2px 2px #00E8CF',
            borderRadius: '4px',
          }}
          placeholder="Enter a username"
          tabIndex={-1}
        />
      </FormField>
    </Form>
  );
