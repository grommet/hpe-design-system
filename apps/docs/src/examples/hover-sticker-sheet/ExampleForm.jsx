/* eslint-disable */
import React, { useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  CheckBoxGroup,
  Form,
  FormField,
  Notification,
  RadioButtonGroup,
  Select,
  TextInput,
} from 'grommet';

const COUNTRY_OPTIONS = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Germany',
  'France',
  'Japan',
];

const CONTACT_OPTIONS = [
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Text message', value: 'text' },
];

const NOTIFICATION_OPTIONS = ['Product updates', 'Security alerts', 'Newsletter'];

const DEFAULT_VALUES = {
  firstName: '',
  lastName: '',
  country: '',
  contact: 'email',
  notifications: [],
  twoFactor: false,
};

export const ExampleForm = () => {
  const [formValue, setFormValue] = useState(DEFAULT_VALUES);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Box width={{ max: 'medium' }}>
      <Form
        value={formValue}
        onChange={nextValue => setFormValue(nextValue)}
        onSubmit={() => setSubmitted(true)}
      >
        <FormField name="firstName" htmlFor="firstName" label="First name" required>
          <TextInput id="firstName" name="firstName" placeholder="Jane" />
        </FormField>

        <FormField name="lastName" htmlFor="lastName" label="Last name" required>
          <TextInput id="lastName" name="lastName" placeholder="Smith" />
        </FormField>

        <FormField name="country" htmlFor="country" label="Country">
          <Select
            id="country"
            name="country"
            options={COUNTRY_OPTIONS}
            placeholder="Select a country..."
          />
        </FormField>

        <FormField name="contact" label="Preferred contact method">
          <RadioButtonGroup name="contact" options={CONTACT_OPTIONS} />
        </FormField>

        <FormField name="notifications" label="Notifications">
          <CheckBoxGroup name="notifications" options={NOTIFICATION_OPTIONS} />
        </FormField>

        <FormField name="twoFactor">
          <CheckBox
            name="twoFactor"
            toggle
            label="Enable two-factor authentication"
          />
        </FormField>

        <Box direction="row" gap="small" margin={{ top: 'medium' }}>
          <Button type="submit" primary label="Submit" />
          <Button
            label="Reset"
            onClick={() => {
              setFormValue(DEFAULT_VALUES);
              setSubmitted(false);
            }}
          />
        </Box>
      </Form>

      {submitted && (
        <Notification
          toast
          title="Form submitted!"
          message="Thank you — your response has been recorded."
          status="normal"
          onClose={() => setSubmitted(false)}
        />
      )}
    </Box>
  );
};
