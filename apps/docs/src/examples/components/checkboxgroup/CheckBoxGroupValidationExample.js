import React, { useState } from 'react';
import { Box, CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupValidationExample = () => {
  const demoErrorMessage =
    'Select at least one checkbox option to resolve error.';
  const [message, setMessage] = useState(demoErrorMessage);

  return (
    <Box width="xsmall">
      <Form>
        <FormField
          name="required-field"
          label="Label"
          htmlFor="required-field"
          error={message}
          required
        >
          <CheckBoxGroup
            name="required-field"
            id="required-field"
            onChange={event => {
              // Demonstrating error message behavior
              setMessage(event.value.length >= 1 ? '' : demoErrorMessage);
            }}
            options={['Option 1', 'Option 2', 'Option 3']}
          />
        </FormField>
      </Form>
    </Box>
  );
};
