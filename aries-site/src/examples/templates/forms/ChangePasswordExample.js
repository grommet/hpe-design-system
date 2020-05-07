import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  TextInput,
} from 'grommet';

const passwordRulesWeak = [
  {
    regexp: new RegExp('.{4,}'),
    message: 'At least four characters',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
];

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box
        flex
        pad={{ horizontal: 'medium', vertical: 'medium' }}
        {...rest}
       />
    </Box>
  );
};

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
        <Box
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
              help={`Include ${passwordRulesWeak.map(rule => {
                return ` ${rule.message.toLowerCase()}`;
              })}`}
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
        </Box>
      </Box>
    </FormContainer>
  );
};
