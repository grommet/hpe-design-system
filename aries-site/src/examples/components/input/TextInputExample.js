import React, { useState } from 'react';
import { Box, FormField, TextInput } from 'grommet';

const usernamePlaceholder = 'Email address';
const passwordPlaceholder = 'Password';

export const TextInputExample = () => {
  const [password, setPassword] = useState('my3xampl3Pa$$word');
  const inputKeys = {
    username: 'username-vertical',
    password: 'password-vertical',
  };
  
  return (
    <Box direction="row-responsive" gap="large" align="end">
      <Box width="small">
        <FormField label="Username" htmlFor={inputKeys.username}>
          <TextInput
            id={inputKeys.username}
            placeholder={usernamePlaceholder}
            type="email"
          />
        </FormField>
        <FormField label="Password" htmlFor={inputKeys.password}>
          <TextInput
            id={inputKeys.password}
            placeholder={passwordPlaceholder}
            type="password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </FormField>
      </Box>
    </Box>
  );
};
