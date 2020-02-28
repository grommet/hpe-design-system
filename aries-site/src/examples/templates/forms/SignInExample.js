import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  Main,
  Text,
  TextInput,
} from 'grommet';
import { Close, Next } from 'grommet-icons';

import { FormContainer } from '.';
import { emailValidation } from './formHelpers';

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
        <Heading level={2} margin="none">
          Reset Password
        </Heading>
        <Form
          validate="blur"
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
        >
          <Text>A password reset email will be sent to </Text>
          <FormField
            label="Email"
            name="resetEmail"
            component={TextInput}
            type="email"
            placeholder="your.email@company.com"
            validate={emailValidation}
          />
          <Button label="Send Password Reset" primary type="submit" />
        </Form>
      </Box>
    </>
  );
};

export const SignInExample = () => {
  const [formValues, setFormValues] = React.useState({});
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);

  const onClose = () => {
    setShowForgotPassword(false);
  };

  const onForgotPassword = () => {
    setShowForgotPassword(true);
  };

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
            Sign In
          </Heading>
          <Text>to Hewlett Packard Enterprise</Text>
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
              name="email"
              label="Email"
              component={TextInput}
              placeholder="james@hpe.com"
              type="email"
              validate={emailValidation}
            />
            <FormField
              name="password"
              label="Password"
              component={TextInput}
              placeholder="•••••••••••••••"
              type="password"
            />
            <CheckBox name="termsAndPrivacy" label="Remember me" />
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button
                label="Sign in"
                icon={<Next />}
                reverse
                primary
                type="submit"
              />
            </Box>
          </Form>
          <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
            <Button
              label={
                <Text weight={600} style={{ textDecoration: 'underline' }}>
                  Forgot Password?
                </Text>
              }
              onClick={onForgotPassword}
              color="brand"
              plain
            />
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
        </Main>
      </Box>
    </FormContainer>
  );
};

ResetPassword.propTypes = {
  closeLayer: PropTypes.func,
  email: PropTypes.string,
};
