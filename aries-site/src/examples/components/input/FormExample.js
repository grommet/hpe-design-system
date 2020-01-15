import React from 'react';
import { Box, FormField, Text } from 'grommet';
import { Hpe } from 'grommet-icons';
import { Anchor, Button, Checkbox, Form, TextInput } from 'aries-core';

import { FormRow, UsageExample } from '../../../layouts';

const LoginExample = () => {
  return (
    <Form>
      <Box align="start" gap="medium">
        <Hpe color="brand" size="large" />
        <Text size="large">Sign in to HPE</Text>
        <FormField label="Email" htmlFor="username">
          <TextInput id="username" placeholder="Email address" type="email" />
        </FormField>
        <FormField>
          <Checkbox label="Keep me signed in" />
        </FormField>
        <Button label="Next" primary />
        <Anchor label="Forgot your password?" />
      </Box>
    </Form>
  );
};

const ProductConfigExample = () => {
  return (
    <Form>
      <Box gap="medium">
        <Text size="large">Create Server Profile</Text>
        <FormRow label="Name" htmlFor="server-name">
          <TextInput id="server-name" />
        </FormRow>
        <FormRow
          label="Server Profile Template"
          htmlFor="server-profile-template"
        >
          <TextInput id="server-profile-template" />
        </FormRow>
        <FormRow label="Description" htmlFor="server-description">
          <TextInput id="server-description" />
        </FormRow>
        <FormRow label="Server Hardware" htmlFor="server-hardware">
          <TextInput id="server-hardware" />
        </FormRow>
        <FormRow>
          <Checkbox label="Show my empty bays" />
        </FormRow>
        <FormRow>
          <Box align="end">
            <Button label="Create" onClick={() => {}} primary />
          </Box>
        </FormRow>
      </Box>
    </Form>
  );
};

export const FormExample = () => {
  return (
    <Box gap="medium">
      <UsageExample label="Login or Account Information">
        <LoginExample />
      </UsageExample>
      <UsageExample label="In Product Configuration">
        <ProductConfigExample />
      </UsageExample>
    </Box>
  );
};
