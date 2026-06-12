import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  ResponsiveContext,
  TextInput,
} from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const ButtonBusySimpleExample = () => {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const size = useContext(ResponsiveContext);

  const handleSubmit = () => {
    if (busy || success) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3500);
    }, 2000);
  };

  return (
    <ContentPane width="medium">
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
        <FormField htmlFor="email" label="Email address" name="email" required>
          <TextInput
            id="email"
            name="email"
            placeholder="you@example.com"
            type="email"
          />
        </FormField>
        <FormField htmlFor="jobTitle" label="Job title" name="jobTitle">
          <TextInput
            id="jobTitle"
            name="jobTitle"
            placeholder="e.g. Platform engineer"
          />
        </FormField>
        <Box
          align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
          margin={{ top: 'medium', bottom: 'xsmall' }}
        >
          <Button
            busy={busy}
            label="Save profile"
            primary
            success={success}
            type="submit"
          />
        </Box>
      </Form>
    </ContentPane>
  );
};
