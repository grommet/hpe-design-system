import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxValidationExample = () => {
  const demoCheckboxError = 'Check checkbox to resolve error.';
  const demoToggleError = 'Check toggle to resolve error.';
  const [message, setMessage] = useState(demoCheckboxError);
  const [toggleMessage, setToggleMessage] = useState(demoToggleError);

  return (
    <Box gap='xlarge' direction="row-responsive">
      <Box width="medium" gap="medium">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            error={message}
            required
          >
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
          <FormField
            name="required-field"
            label="Label"
            htmlFor="validation-example-2"
            error={toggleMessage}
          >
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
