import React, { useState } from 'react';
import { Box, FormField, TextInput } from 'grommet';

export const TextInputPasswordExample = () => {
  const [password, setPassword] = useState('123password');

  return (
    <Box direction="row-responsive" gap="large" align="end">
      <Box width="small">
        <FormField label="Password" htmlFor="password-example">
          <TextInput
            id="password-example"
            placeholder="Placeholder text"
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </FormField>
      </Box>
    </Box>
  );
};
