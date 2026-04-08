import React from 'react';
import { Box, CheckBox, Form, FormField } from 'grommet';

export const CheckBoxDisabledExample = () => (
  <Box gap="xlarge" direction="row-responsive">
    <Box width="medium">
      <Form>
        {/* CheckBox label provides the accessible name; htmlFor on FormField
       would create a duplicate label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="disabled-checkbox" disabled>
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
        {/* CheckBox label provides the accessible name; htmlFor on FormField
       would create a duplicate label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="disabled-checkbox" disabled>
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
