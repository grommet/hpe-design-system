import React from 'react';
import { Box, FormField, TextInput } from 'grommet';

export const TextInputDisabledExample = () => (
  <Box>
    <Box width="small">
      <FormField label="Label" htmlFor="text-input" disabled>
        <TextInput id="text-input" placeholder="Placeholder text" disabled />
      </FormField>
    </Box>
  </Box>
);
