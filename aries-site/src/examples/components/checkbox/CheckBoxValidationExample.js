import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxValidationExample = () => {
  const [togglemessage, setToggleMessage] = useState(
    'Check toggle to resolve error',
  );
  const [message, setMessage] = useState('Check checkbox to resolve error');

  return (
    <Box gap="large" direction="row-responsive">
      <Box width="medium" gap="medium">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            error={message}
          >
            <CheckBox
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
            error={togglemessage}
          >
            <CheckBox
              name="required-field"
              id="validation-example-2"
              label="Validation-toggle"
              onChange={event => {
                if (event.target.checked) {
                  setToggleMessage('');
                }
                if (!event.target.checked) {
                  setToggleMessage('Check toggle to resolve error');
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
