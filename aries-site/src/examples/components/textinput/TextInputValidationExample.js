import React from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

export const TextInputValidationExample = () => (
  <Box>
    <Box width="small">
      <Form>
        <FormField name="username" label="Label" htmlFor="username" required>
          <TextInput
            name="username"
            id="username"
            placeholder="Placeholder text"
          />
        </FormField>
        <Button label="Submit" type="submit" />
      </Form>
    </Box>
  </Box>
);
