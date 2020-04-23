import React from 'react';
import { Box, FormField, TextInput } from 'grommet';

export const TextInputExample = () => (
  <Box direction="row-responsive" gap="large" align="end">
    <Box width="small">
      <FormField label="Label" htmlFor="username">
        <TextInput id="username" placeholder="Placeholder text" type="email" />
      </FormField>
    </Box>
  </Box>
);
