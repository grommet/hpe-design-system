import React, { useState, useEffect } from 'react';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  MaskedInput,
  Text,
  TextInput,
} from 'grommet';

const emailValidation = [
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    message: '! Enter a valid email address',
    status: 'error',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: '! Enter a valid email address',
    status: 'error',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: '! Enter a valid email address',
    status: 'error',
  },
];

const passwordRulesStrong = [
  {
    regexp: new RegExp('(?=.*?[A-Z])'),
    message: 'At least one uppercase English letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[a-z])'),
    message: 'At least one lowercase English letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
  {
    regexp: new RegExp('.{8,}'),
    message: 'At least 8 characters',
    status: 'error',
  },
];

const emailMask = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: 'jane.smith',
  },
  { fixed: '@' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'hpe',
  },
  { fixed: '.' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'com',
  },
];

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

export const SignUpExample = () => {
  const [formValues, setFormValues] = React.useState({
    email: 'jane.smith@hpe.com',
    termsAndConditions: false,
  });
  const [passwordError, setPasswordError] = useState(
    <Text size="xsmall">
      At least 8 characters, <br /> One lowercase letter <br /> One uppercase
      letter <br /> One special character
    </Text>,
  );

  const PasswordValidation = password => {
    passwordRulesStrong.map(passwordRules => {
      console.log('???', passwordRules.regexp);
      console.log('message', passwordRules.message);
      console.log(passwordRules.regexp.test(password));
      if (passwordRules.regexp.test('password') === true) {
        setPasswordError('CheckMark', passwordRules.message);
      } else if (passwordRules.regexp.test('password') === false) {
        setPasswordError('X', passwordRules.message);
      } else {
        PasswordError;
      }
      return passwordError;
    });
  };

  useEffect(() => {
    console.log(PasswordValidation('hello'));
  }, []);

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
            Sign Up
          </Heading>
          <Text>for a Hewlett Packard Enterprise account</Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            validate="blur"
            value={formValues}
            // messages={{required: <Box><icon ! ><Text>This is required</Text></Box>}}
            messages={{
              required: '! this is required',
            }}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <FormField
              label="Email"
              htmlFor="email-sign-up"
              name="email"
              validate={emailValidation}
            >
              <MaskedInput id="email-sign-up" name="email" type="email" />
            </FormField>
            <FormField
              label="Full Name"
              htmlFor="fullName-sign-up"
              name="fullName"
              required
            >
              <TextInput
                id="fullName-sign-up"
                name="fullName"
                placeholder="First and Last Name"
              />
            </FormField>
            <FormField
              label="Password"
              htmlFor="password-sign-up"
              name="password"
              info={
                <Text size="xsmall">
                  At least 8 characters, <br /> One lowercase letter <br /> One
                  uppercase letter <br /> One special character
                </Text>
              }
              // validate={passwordRulesStrong}
            >
              <TextInput
                id="password-sign-up"
                name="password"
                placeholder="•••••••••••••••"
                type="password"
              />
            </FormField>
            <FormField
              name="termsAndConditions"
              required
              validate={{ status: 'error', message: 'hello' }}
              htmlFor="terms-and-privacy"
            >
              <CheckBox
                name="termsAndConditions"
                id="terms-and-privacy"
                label={
                  <Text>
                    I accept the HPE{' '}
                    <Anchor
                      label="Terms of Use"
                      href="#"
                      target="_blank"
                      rel="noreferrer noopener"
                    />{' '}
                    and{' '}
                    <Anchor
                      label="Privacy Policy"
                      href="#"
                      target="_blank"
                      rel="noreferrer noopener"
                    />
                  </Text>
                }
              />
            </FormField>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Sign Up" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
