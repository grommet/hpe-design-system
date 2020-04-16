import React from 'react';
import { Box, Button, Form, FormField, TextInput } from 'grommet';

export const TextInputValidationExample = () => (
  <Box>
    <Box width="small">
      <Form>
        <FormField
          name="required-field"
          label="Label"
          htmlFor="required-field"
          required
        >
          <TextInput
            name="required-field"
            id="required-field"
            placeholder="Placeholder text"
          />
        </FormField>
        <Button label="Submit" type="submit" />
      </Form>
    </Box>
  </Box>
);
