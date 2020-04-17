import React from 'react';
import { Box, Button, Form, FormField, TextArea } from 'grommet';

export const TextAreaValidationExample = () => (
  <Box>
    <Box width="small">
      <Form>
        <FormField
          name="required-field"
          label="Label"
          htmlFor="required-field"
          required
        >
          <TextArea
            name="required-field"
            id="required-field"
            placeholder="Placeholder text"
          />
        </FormField>
        <Button label="Validate" type="submit" />
      </Form>
    </Box>
  </Box>
);
