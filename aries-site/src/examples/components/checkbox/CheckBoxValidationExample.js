import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxValidationExample = () => {
  const defaultErrorMessage = 'Check a value to resolve this error.';
  const [message, setMessage] = useState(defaultErrorMessage);

  return (
    <Box gap="large" direction="row">
      <Box gap="medium">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            required
            error={message}
          >
            <CheckBox
              onChange={event => {
                if (event.target.checked) {
                  setMessage('');
                } else {
                  setMessage(defaultErrorMessage);
                }
              }}
              label="Validation"
            />
          </FormField>
        </Form>
      </Box>
      <Box gap="medium">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            required
            error={message}
          >
            <CheckBox
              id="required-field"
              label="Validation-toggle"
              onChange={event => {
                if (event.target.checked) {
                  setMessage('');
                } else {
                  setMessage(defaultErrorMessage);
                }
              }}
              toggle
            />
          </FormField>
        </Form>
      </Box>
    </Box>
  );
};
