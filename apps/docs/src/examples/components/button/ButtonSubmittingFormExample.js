import React, { useState } from 'react';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonSubmittingFormExample = () => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <Box align="center" justify="center" pad="large" gap="medium">
        <Text>Profile updated successfully.</Text>
        <Button label="Reset" onClick={() => setSubmitted(false)} />
      </Box>
    );
  }

  return (
    <Box pad="medium" width="medium">
      <Form onSubmit={() => setSubmitted(true)}>
        <FormField
          label="First name"
          name="firstName"
          htmlFor="firstName"
          required
        >
          <TextInput id="firstName" name="firstName" placeholder="Jane" />
        </FormField>
        <FormField
          label="Last name"
          name="lastName"
          htmlFor="lastName"
          required
        >
          <TextInput id="lastName" name="lastName" placeholder="Smith" />
        </FormField>
        <FormField label="Email" name="email" htmlFor="email" required>
          <TextInput
            id="email"
            name="email"
            type="email"
            placeholder="jane.smith@example.com"
          />
        </FormField>
        <ButtonGroup pad={{ top: 'medium' }}>
          <Button label="Save changes" primary type="submit" />
          <Button label="Cancel" onClick={() => {}} />
        </ButtonGroup>
      </Form>
    </Box>
  );
};
