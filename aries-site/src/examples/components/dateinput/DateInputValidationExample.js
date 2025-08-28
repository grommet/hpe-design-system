import React, { useState } from 'react';
import { Box, Form, FormField, DateInput } from 'grommet';

export const DateInputValidationExample = () => {
  const [value, setValue] = React.useState('');
  const defaultErrorMessage =
    'Select or type a valid date to resolve this error.';
  const [message, setMessage] = useState(defaultErrorMessage);

  return (
    <Box align="center" pad='xlarge'>
      <Form>
        <FormField
          name="required-field"
          label="Required field"
          htmlFor="required-field"
          error={message}
          required
        >
          <DateInput
            onChange={event => {
              const nextValue = event.value;
              if (!nextValue) {
                setMessage(defaultErrorMessage);
              } else {
                setMessage('');
                setValue(nextValue);
              }
            }}
            name="required-field"
            id="required-field"
            format="mm/dd/yyyy"
            value={value}
          />
        </FormField>
      </Form>
    </Box>
  );
};
