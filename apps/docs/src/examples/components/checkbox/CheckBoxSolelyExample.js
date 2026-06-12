import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  ResponsiveContext,
  TextInput,
} from 'grommet';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const CheckBoxSolelyExample = () => {
  const [checked, setChecked] = useState(false);
  const size = useContext(ResponsiveContext);

  return (
    <ContentPane width="medium">
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
        <FormField name="agree">
          <CheckBox
            id="agree"
            name="agree"
            label="I agree to the terms and conditions"
            checked={checked}
            onChange={event => setChecked(event.target.checked)}
          />
        </FormField>

        <Box
          align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
          margin={{ top: 'medium', bottom: 'xsmall' }}
        >
          <Button
            label="Create account"
            primary
            type="submit"
            disabled={!checked}
          />
        </Box>
      </Form>
    </ContentPane>
  );
};
