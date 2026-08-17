import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxValidationExample = () => {
  const demoCheckboxError = 'Check checkbox to resolve error.';
  const [message, setMessage] = useState(demoCheckboxError);

  return (
    <Box width="medium" gap="medium">
      <Form>
        {/* CheckBox label provides the accessible name; htmlFor on FormField
       would create a duplicate label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="required-field" error={message} required>
          <CheckBox
            name="required-field"
            id="required-field"
            onChange={event => {
              // Demonstrating error message state
              setMessage(event.target.checked ? '' : demoCheckboxError);
            }}
            label="Validation"
          />
        </FormField>
      </Form>
    </Box>
  );
};
