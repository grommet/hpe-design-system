import React from 'react';
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
    regexp: new RegExp('(?=.*?[0-9])'),
    message: 'At least one number',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
  {
    regexp: new RegExp('.{8,}'),
    message: 'At least eight characters',
    status: 'error',
  },
];

const emailValidation = [
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    message: 'Missing an @?',
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: 'Missing an .?',
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: "Email address doesn't look quite right",
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
      <Box
        flex
        pad={{ horizontal: 'medium', vertical: 'medium' }}
        {...rest}
       />
    </Box>
  );
};

export const SimpleSignUpExample = () => {
  const [formValues, setFormValues] = React.useState({
    email: 'jane.smith@hpe.com',
  });

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
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <FormField
              label="Email"
              htmlFor="email-sign-up-simple"
              name="email"
              validate={emailValidation}
            >
              <MaskedInput
                id="email-sign-up-simple"
                name="email"
                mask={emailMask}
                type="email"
              />
            </FormField>
            <FormField
              label="Full Name"
              htmlFor="fullName-sign-up-simple"
              name="fullName"
              required
            >
              <TextInput
                id="fullName-sign-up-simple"
                name="fullName"
                placeholder="Jane Smith"
              />
            </FormField>
            <FormField
              label="Password"
              htmlFor="password-sign-up-simple"
              name="password"
              validate={passwordRulesStrong}
            >
              <TextInput
                id="password-sign-up-simple"
                name="password"
                placeholder="•••••••••••••••"
                type="password"
              />
            </FormField>
            <FormField htmlFor="terms-and-privacy-simple">
              <CheckBox
                id="terms-and-privacy-simple"
                name="termsAndPrivacy"
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
              <Button label="Sign up" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
