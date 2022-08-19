import React from 'react';
import { Box, FormField, MaskedInput, Text, TextInput } from 'grommet';
import { emailMask, emailValidation, phoneMask } from '../utils/FormValidation';

export const ContactInformation = () => (
  <Box>
    <Text size="large" margin={{ vertical: 'small' }}>
      Contact Information
    </Text>
    <FormField
      contentProps={{ width: 'medium' }}
      label="Full Name"
      required
      htmlFor="fullName"
      name="fullName-shipping"
    >
      <TextInput id="fullName" name="fullName-shipping" />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="phone-shipping"
      name="phone-shipping"
      label="Phone Number"
    >
      <MaskedInput id="phone-shipping" name="phone-shipping" mask={phoneMask} />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="email-ship"
      name="email-shipping"
      required
      label="Email Address"
      validate={emailValidation}
    >
      <MaskedInput id="email-ship" name="email-shipping" mask={emailMask} />
    </FormField>
  </Box>
);
