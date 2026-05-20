
import React, { useState } from 'react';
import { Box, Button, CheckBox, Form, FormField, TextInput } from 'grommet';

export const CheckBoxSolelyExample = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <Box width="medium">
      <Form>
        <FormField label="Email" htmlFor="signin-email" name="email">
          <TextInput
            id="signin-email"
            name="email"
            type="email"
            placeholder="you@example.com"
          />
        </FormField>
        <FormField label="Password" htmlFor="signin-password" name="password">
          <TextInput
            id="signin-password"
            name="password"
            type="password"
            placeholder="Enter password"
          />
        </FormField>
        {/* CheckBox label provides the accessible name; htmlFor on FormField
            would create a duplicate label, causing an a11y violation. */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField name="agree" margin={{ bottom: 'medium' }}>
          <CheckBox
            id="agree"
            name="agree"
            label="I agree to the terms and conditions"
            checked={agreed}
            onChange={event => setAgreed(event.target.checked)}
          />
        </FormField>
        <Button
          label="Create account"
          primary
          type="submit"
          disabled={!agreed}
        />
      </Form>
    </Box>
  );
};
