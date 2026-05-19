import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  TextInput,
} from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonBusySimpleExample = () => {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (success) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccess(true);
    }, 2000);
    setTimeout(() => {
      setSuccess(false);
    }, 3500);
  };

  return (
    <Box
      align="center"
      fill
      justify="center"
    >
      <Box
        background="background-front"
        pad="medium"
        round="small"
        width="medium"
      >
        <Form onSubmit={handleSubmit}>
          <FormField
            htmlFor="fullName"
            label="Full name"
            name="fullName"
            required
          >
            <TextInput
              id="fullName"
              name="fullName"
              placeholder="Your full name"
            />
          </FormField>
          <FormField
            htmlFor="email"
            label="Email address"
            name="email"
            required
          >
            <TextInput
              id="email"
              name="email"
              placeholder="you@example.com"
              type="email"
            />
          </FormField>
          <FormField
            htmlFor="jobTitle"
            label="Job title"
            name="jobTitle"
          >
            <TextInput
              id="jobTitle"
              name="jobTitle"
              placeholder="e.g. Platform engineer"
            />
          </FormField>
          <ButtonGroup pad={{ top: 'medium' }}>
            <Button
              busy={busy}
              label="Save profile"
              primary
              success={success}
              type="submit"
            />
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  );
};
