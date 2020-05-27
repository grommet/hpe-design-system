import React, { useState } from 'react';
import { Box, CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupValidationExample = () => {
  const [message, setMessage] = useState('Check checkbox to resolve error');

  return (
    <Box width="small">
      <Form>
        <FormField
          name="required-field"
          label="Label"
          htmlFor="required-field"
          error={message}
        >
          <CheckBoxGroup
            name="checkbox"
            id="required-field"
            onChange={event => {
              if (event.target.checked) {
                setMessage('');
              }
              if (!event.target.checked) {
                setMessage('Check checkbox to resolve error');
              }
            }}
            options={['Option 1', 'Option 2', 'Option 3']}
          />
        </FormField>
      </Form>
    </Box>
  );
};
