import React from 'react';
import { Box, FormField, Text } from 'grommet';
import { Hpe } from 'grommet-icons';
import { Anchor, Button, Checkbox, Form, TextInput } from 'aries-core';

import { UsageExample } from '../../../layouts';

const LoginExample = () => {
  return (
    <Form>
      <Box align="start" gap="medium">
        <Hpe color="brand" size="large" />
        <Text size="large">Sign in to HPE</Text>
        <FormField label="Email" htmlFor="username">
          <TextInput id="username" placeholder="Email address" type="email" />
        </FormField>
        <Checkbox label="Keep me signed in" />
        <Button type="submit" label="Next" primary />
        <Anchor label="Forgot your password?" />
      </Box>
    </Form>
  );
};

export const FormExample = () => {
  return (
    <Box gap="medium">
      <UsageExample
        pad={{
          horizontal: 'large',
          top: 'medium',
          bottom: 'large',
          small: { horizontal: 'large', vertical: 'xlarge' },
        }}
      >
        <LoginExample />
      </UsageExample>
    </Box>
  );
};
