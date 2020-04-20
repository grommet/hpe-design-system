import React from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxDisabledExample = () => {
  return (
    <Box>
      <FormField label="Label" htmlFor="disabled-checkbox" disabled>
        <CheckBox
          label="disabled"
          id="disabled-checkbox"
          checked
          disabled
        />
      </FormField>
      <FormField label="Label" htmlFor="disabled-toggle" disabled>
        <CheckBox
          label="disabled"
          id="disabled-toggle"
          checked
          disabled
          toggle
        />
      </FormField>
    </Box>
  );
};