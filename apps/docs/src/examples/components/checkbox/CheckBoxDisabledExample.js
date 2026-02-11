import React from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxDisabledExample = () => (
    <Box gap="xlarge" direction="row-responsive">
      <Box width="medium">
        <Form>
          <FormField
            name="disabled-checkbox"
            label="Label"
            htmlFor="disabled-checkbox"
            disabled
          >
            <CheckBox
              name="disabled-checkbox"
              id="disabled-checkbox"
              label="Disabled"
              disabled
            />
          </FormField>
        </Form>
      </Box>
      <Box width="medium">
        <Form>
          <FormField
            name="disabled-checkbox"
            label="Label"
            htmlFor="disabled-toggle"
            disabled
          >
            <CheckBox
              name="disabled-checkbox"
              id="disabled-toggle"
              label="Disabled"
              disabled
              toggle
            />
          </FormField>
        </Form>
      </Box>
    </Box>
  );
