import React from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxDisabledExample = () => {
  return (
    <Box>
      <FormField label="Label" htmlFor="disabled-checkbox" disabled>
        <CheckBox
          id="disabled-checkbox"
          label="Disabled"
          disabled
        />
      </FormField>
      <FormField label="Label" htmlFor="disabled-toggle" disabled>
        <CheckBox
          id="disabled-toggle"
          label="Disabled"
          disabled
          toggle
        />
      </FormField>
    </Box>
  );
};
