import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Text,
  TextInput,
} from 'grommet';
import { Hpe } from 'grommet-icons';
import { Anchor } from 'aries-core';

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
        <CheckBox label="Keep me signed in" />
        <Button type="submit" label="Next" primary />
        <Anchor label="Forgot your password?" size="small" />
      </Box>
    </Form>
  );
};

const ProductConfigExample = () => {
  const labelKeys = {
    name: 'server-name',
    profile: 'server-profile-template',
    description: 'server-description',
    hardware: 'server-hardware',
  };

  return (
    <Box fill>
      <Form>
        <Box gap="medium">
          <Text size="large" weight="bold">
            Create Server Profile
          </Text>
          <FormField label="Name" htmlFor={labelKeys.name}>
            <TextInput id={labelKeys.name} />
          </FormField>
          <FormField
            label="Server Profile Template"
            htmlFor={labelKeys.profile}
          >
            <TextInput id={labelKeys.profile} />
          </FormField>
          <FormField label="Description" htmlFor={labelKeys.description}>
            <TextInput id={labelKeys.description} />
          </FormField>
          <FormField label="Server Hardware" htmlFor={labelKeys.hardware}>
            <TextInput id={labelKeys.hardware} />
          </FormField>
          <CheckBox label="Show empty bays" />
          <Button type="submit" label="Create" primary alignSelf="end" />
        </Box>
      </Form>
    </Box>
  );
};

export const FormExample = () => {
  return (
    <Box gap="medium">
      <UsageExample
        label="Login or Account Information"
        pad={{
          horizontal: 'large',
          top: 'medium',
          bottom: 'large',
          small: { horizontal: 'large', vertical: 'xlarge' },
        }}
      >
        <LoginExample />
      </UsageExample>
      <UsageExample
        label="In Product Configuration"
        pad={{
          horizontal: 'large',
          vertical: 'large',
          small: { horizontal: 'large', vertical: 'xlarge' },
        }}
      >
        <ProductConfigExample />
      </UsageExample>
    </Box>
  );
};
