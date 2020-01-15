import React from 'react';
import { Box, FormField } from 'grommet';
import { TextInput } from 'aries-core';

import { FormRow, UsageExample } from '../../../layouts';

const usernamePlaceholder = 'Email address';
const passwordPlaceholder = 'Password';

const LabelInlineExample = () => {
  return (
    <Box gap="large" pad={{ bottom: 'small' }}>
      <FormRow label="Username" htmlFor="username-inline">
        <TextInput id="username-inline" placeholder={usernamePlaceholder} />
      </FormRow>
      <FormRow label="Password" htmlFor="password-inline">
        <TextInput
          id="password-inline"
          placeholder={passwordPlaceholder}
          type="password"
          value="fadskjadfs;fjasdjkf"
        />
      </FormRow>
    </Box>
  );
};
const LabelVerticalExample = () => {
  return (
    <Box width="small">
      <FormField label="Username" htmlFor="username-vertical">
        <TextInput
          id="username-vertical"
          placeholder={usernamePlaceholder}
          type="email"
        />
      </FormField>
      <FormField label="Password" htmlFor="password-vertical">
        <TextInput
          id="password-vertical"
          placeholder={passwordPlaceholder}
          type="password"
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
