import React from 'react';
import { Box, CheckBox, FormField } from 'grommet';

export const CheckBoxDisabledExample = () => {
  return (
    <Box gap="large" direction="row">
      <Box width="medium">
        <FormField label="Label" htmlFor="disabled-checkbox" disabled>
          <CheckBox id="disabled-checkbox" label="Disabled" disabled />
        </FormField>
      </Box>
      <Box width="medium">
        <FormField label="Label" htmlFor="disabled-toggle" disabled>
          <CheckBox id="disabled-toggle" label="Disabled" disabled toggle />
        </FormField>
      </Box>
    </Box>
  );
};
