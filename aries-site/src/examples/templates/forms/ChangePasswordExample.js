import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Main,
  Text,
  TextInput,
} from 'grommet';

import { FormContainer } from '.';
import { passwordRulesWeak } from './formHelpers';

export const ChangePasswordExample = () => {
  const [formValues, setFormValues] = React.useState({});
  const [readyToSubmit, setReadyToSubmit] = React.useState(false);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  const confirmPassword = () => {
    const doesMatch = formValues.newPassword === formValues.confirmPassword;
    setReadyToSubmit(doesMatch);
    return doesMatch
      ? undefined
      : { message: 'Passwords do not match', status: 'error' };
  };

  return (
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Heading level={3} margin="none">
            Change Password
          </Heading>
        </Header>
        <Main
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            validate="blur"
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <FormField
              htmlFor="currentPassword"
              name="currentPassword"
              label="Current Password"
            >
              <TextInput
                id="currentPassword"
                name="currentPassword"
                placeholder="•••••••••••••••"
                type="password"
              />
            </FormField>
            <FormField
              htmlFor="newPassword"
              name="newPassword"
              label="New Password"
              help={
                <Text size="xsmall">
                  {`Include ${passwordRulesWeak.map(rule => {
                    return ` ${rule.message.toLowerCase()}`;
                  })}`}
                </Text>
              }
              validate={passwordRulesWeak}
            >
              <TextInput
                id="newPassword"
                name="newPassword"
                placeholder="•••••••••••••••"
                type="password"
              />
            </FormField>
            <FormField
              htmlFor="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              validate={confirmPassword}
            >
              <TextInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="•••••••••••••••"
                type="password"
              />
            </FormField>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button
                label="Update Password"
                primary
                type="submit"
                disabled={!readyToSubmit}
              />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
