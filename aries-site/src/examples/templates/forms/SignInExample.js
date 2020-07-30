import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Layer,
  Text,
  TextInput,
} from 'grommet';
import { Close, FormNext, CircleAlert } from 'grommet-icons';

const emailErrorMessage = (
  <Box
    background="background-front"
    align="center"
    gap="xsmall"
    direction="row"
  >
    <CircleAlert size="small" />
    <Text size="xsmall">This is a required field.</Text>
  </Box>
);

const emailValidation = [
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    message: emailErrorMessage,
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: emailErrorMessage,
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: emailErrorMessage,
    status: 'error',
  },
];

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

const ResetPassword = ({ closeLayer, email }) => {
  const [formValues, setFormValues] = React.useState({ resetEmail: email });

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your password reset logic here
    // Display success status
    closeLayer();
  };

  return (
    <>
      <Box
        direction="row"
        justify="end"
        pad={{ horizontal: 'small', top: 'small' }}
      >
        <Button
          a11yTitle="Close reset password form"
          icon={<Close />}
          onClick={closeLayer}
        />
      </Box>
      <Box
        gap="medium"
        margin={{ horizontal: 'xlarge', bottom: 'xlarge', top: 'large' }}
        width="medium"
      >
        <Text size="xxlarge" weight="bold">
          Reset Password
        </Text>
        <Form
          validate="blur"
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
        >
          <Box gap="medium">
            <Text>
              An email to reset your password will be sent to the following
              address:
            </Text>
            <FormField
              label="Email"
              htmlFor="resetEmail"
              name="resetEmail"
              validate={emailValidation}
            >
              <TextInput
                id="resetEmail"
                name="resetEmail"
                type="email"
                placeholder="your.email@company.com"
              />
            </FormField>
            <Button label="Send Password Reset" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </>
  );
};

export const SignInExample = () => {
  const [formValues, setFormValues] = React.useState({});
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  // setPassword is here for demonstration purposes,
  // for calling credential error
  // eslint-disable-next-line no-unused-vars
  const [password, setPassword] = React.useState('');
  const [credentialError, setCredentialError] = React.useState(false);

  const onClose = () => {
    setShowForgotPassword(false);
  };

  const onForgotPassword = () => {
    setShowForgotPassword(true);
  };

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    // For demonstration purposes, we are mocking a scenario where the password is incorrect.
    // This will cause the error state to appear.
    if (password !== 'password') {
      setCredentialError(true);
    }
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
          <Text size="xxlarge" weight="bold">
            Sign In
          </Text>
          <Text>to Hewlett Packard Enterprise</Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            validate="blur"
            value={formValues}
            onChange={setFormValues}
            messages={{
              required: (
                <Box
                  background="background-front"
                  align="center"
                  gap="xsmall"
                  direction="row"
                >
                  <CircleAlert size="small" />
                  <Text size="xsmall">This is a required field.</Text>
                </Box>
              ),
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <FormField
              required
              label="Email"
              name="email"
              htmlFor="email-sign-in"
              validate={emailValidation}
            >
              <TextInput
                id="email-sign-in"
                name="email"
                placeholder="james@hpe.com"
                type="email"
              />
            </FormField>
            <FormField
              required
              label="Password"
              htmlFor="password-sign-in"
              name="password"
            >
              <TextInput
                id="password-sign-in"
                name="password"
                placeholder="Enter your password"
                type="password"
              />
            </FormField>
            <FormField htmlFor="remember-me">
              <CheckBox
                id="remember-me"
                name="rememberMe"
                label="Remember me"
              />
            </FormField>
            {credentialError && (
              <Box
                direction="row"
                margin={{ top: 'medium', bottom: 'medium' }}
                gap="xsmall"
                round="4px"
                pad="small"
                background={{ light: '#FC61613D', dark: '#C54E4B5C' }}
              >
                <Box align="center" gap="xsmall" direction="row">
                  <CircleAlert size="small" />
                  <Text size="xsmall">Invalid credentials.</Text>
                </Box>
              </Box>
            )}
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button
                label="Sign In"
                icon={<FormNext />}
                reverse
                primary
                type="submit"
              />
            </Box>
          </Form>
          <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
            <Anchor label="Forgot password?" onClick={onForgotPassword} />
            {showForgotPassword && (
              <Layer modal onClickOutside={onClose} onEsc={onClose}>
                <ResetPassword
                  closeLayer={onClose}
                  email={formValues.email}
                  updateForm={setFormValues}
                />
              </Layer>
            )}
          </Box>
        </Box>
      </Box>
    </FormContainer>
  );
};

ResetPassword.propTypes = {
  closeLayer: PropTypes.func,
  email: PropTypes.string,
};
