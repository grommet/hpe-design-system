import React from 'react';
import { Box, FormField, TextInput } from 'grommet';

export const TextInputDisabledExample = () => (
  <Box>
    <Box width="small">
      <FormField label="Label" htmlFor="disabled-input" disabled>
        <TextInput
          id="disabled-input"
          placeholder="Placeholder text"
          disabled
        />
      </FormField>
    </Box>
  </Box>
);
