import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Main,
  TextInput,
} from 'grommet';

import { FormContainer } from '.';

export const ChangePasswordExample = () => {
  const [formValues, setFormValues] = React.useState({});

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
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
              name="currentPassword"
              label="Current Password"
              component={TextInput}
              placeholder="•••••••••••••••"
              type="password"
            />
            <FormField
              name="newPassword"
              label="New Password"
              component={TextInput}
              placeholder="•••••••••••••••"
              type="password"
            />
            <FormField
              name="confirmPassword"
              label="Confirm Password"
              component={TextInput}
              placeholder="•••••••••••••••"
              type="password"
            />
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Update Password" primary type="submit" />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
