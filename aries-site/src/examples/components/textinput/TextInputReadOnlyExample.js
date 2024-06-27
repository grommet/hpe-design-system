import React from 'react';
import { Box, Form, FormField, TextInput } from 'grommet';

export const TextInputReadOnlyExample = () => (
  <Box width="medium">
    <Form>
      <FormField name="readonly-example" label="Email" htmlFor="readonly-input">
        <TextInput
          name="readonly-example"
          id="readonly-input"
          value="testemail@abc.com"
          readOnly
        />
      </FormField>
      <FormField
        name="readonlycopy-example"
        label="Email"
        htmlFor="readonlycopy-input"
      >
        <TextInput
          name="readonlycopy-example"
          id="readonlycopy-input"
          value="testemail@abc.com"
          readOnlyCopy
        />
      </FormField>
    </Form>
  </Box>
);
