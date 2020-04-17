import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxValidationExample = () => {
  const [checked, setChecked] = useState(false);
  
  return (
    <Box gap="large" direction="row">
      <Box gap="medium">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            required
          >
            <CheckBox
              checked={checked}
              onChange={event => setChecked(event.target.checked)}
              label="Validation"
            />
          </FormField>
          <Button label="Validate" type="submit" />
        </Form>
      </Box>
      <Box gap="medium">
        <Form>
          <FormField
            name="required-field"
            label="Label"
            htmlFor="required-field"
            required
          >
            <CheckBox
              label="Validation-toggle"
              checked={checked}
              onChange={event => setChecked(event.target.checked)}
              toggle
            />
          </FormField>
          <Button label="Validate" type="submit" />
        </Form>
      </Box>
    </Box>
  );
};
