import React, { useState } from 'react';
import { Box, Form, FormField, TextArea } from 'grommet';

export const TextAreaValidationExample = () => {
  const [value, setValue] = useState('');
  const defaultErrorMessage = 'Type something to resolve this error.';
  const [message, setMessage] = useState(defaultErrorMessage);

  return (
    <Box>
      <Box width="small">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            error={message}
          >
            <TextArea
              name="required-field"
              id="required-field"
              placeholder="Placeholder text"
              onChange={event => {
                if (event.target.value.length > 0) {
                  setMessage('');
                } else {
                  setMessage(defaultErrorMessage);
                }
                setValue(event.target.value);
              }}
              value={value}
            />
          </FormField>
        </Form>
      </Box>
    </Box>
  );
};
