import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxValidationExample = () => {
  const demoCheckboxError = 'Check checkbox to resolve error.';
  const demoToggleError = 'Check toggle to resolve error.';
  const [message, setMessage] = useState(demoCheckboxError);
  const [toggleMessage, setToggleMessage] = useState(demoToggleError);

  return (
    <Box gap="xlarge" direction="row-responsive">
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
      <Box width="medium" gap="medium">
        <Form>
          {/* CheckBox label provides the accessible name; htmlFor on FormField
       would create a duplicate label, causing an a11y violation. */}
          {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
          <FormField name="required-field" error={toggleMessage}>
            <CheckBox
              name="required-field"
              id="validation-example-2"
              label="Validation-toggle"
              onChange={event => {
                // Demonstrating error message state
                setToggleMessage(event.target.checked ? '' : demoToggleError);
              }}
              toggle
            />
          </FormField>
        </Form>
      </Box>
    </Box>
  );
};
