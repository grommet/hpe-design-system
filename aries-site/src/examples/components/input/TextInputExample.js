import React, { useState } from 'react';
import { Box, FormField } from 'grommet';
import { TextInput } from 'aries-core';

import { FormRow, UsageExample } from '../../../layouts';

const usernamePlaceholder = 'Email address';
const passwordPlaceholder = 'Password';

const LabelInlineExample = () => {
  const [password, setPassword] = useState('my3xampl3Pa$$word');
  const inputKeys = {
    username: 'username-inline',
    password: 'password-inline',
  };

  return (
    <Box gap="large" pad={{ bottom: 'small' }}>
      <FormRow label="Username" htmlFor={inputKeys.username}>
        <TextInput id={inputKeys.username} placeholder={usernamePlaceholder} />
      </FormRow>
      <FormRow label="Password" htmlFor={inputKeys.password}>
        <TextInput
          id={inputKeys.password}
          placeholder={passwordPlaceholder}
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </FormRow>
    </Box>
  );
};
const LabelVerticalExample = () => {
  const [password, setPassword] = useState('my3xampl3Pa$$word');
  const inputKeys = {
    username: 'username-vertical',
    password: 'password-vertical',
  };

  return (
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
  );
};

export const TextInputExample = () => {
  return (
    <UsageExample>
      <Box direction="row-responsive" gap="large" align="end">
        <LabelVerticalExample />
        <LabelInlineExample />
      </Box>
    </UsageExample>
  );
};
