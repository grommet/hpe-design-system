import React from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxDisabledExample = () => {
  return (
    <Box>
      <FormField label="Label" htmlFor="disabled-checkbox" disabled>
        <CheckBox
          label="Disabled"
          checked
          disabled
        />
      </FormField>
      <FormField label="Label" htmlFor="disabled-checkbox" disabled>
        <CheckBox
          label="disabled"
          checked
          disabled
          toggle
        />
      </FormField>
    </Box>
  );
};
