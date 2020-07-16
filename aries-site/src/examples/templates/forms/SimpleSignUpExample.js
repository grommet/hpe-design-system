import React from 'react';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  List,
  Form,
  FormField,
  Header,
  Heading,
  MaskedInput,
  Text,
  TextInput,
} from 'grommet';
import { FormCheckmark, FormClose } from 'grommet-icons';

const passwordRulesStrong = [
  {
    regexp: new RegExp('(?=.*?[A-Z])'),
    message: 'One uppercase letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[a-z])'),
    message: 'One lowercase letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'One special character',
    status: 'error',
  },
  {
    regexp: new RegExp('.{8,}'),
    message: 'At least 8 characters',
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
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

export const SimpleSignUpExample = () => {
  const [formValues, setFormValues] = React.useState({
    email: 'jane.smith@hpe.com',
  });
  const [passwordRules, setPasswordRules] = React.useState(passwordRulesStrong);

  const onChange = values => {
    setFormValues(values);
    const adjustedPasswordRules = passwordRules.map(rule => {
      const adjustedRule = { ...rule };
      const valid = adjustedRule.regexp.test(values.password);
      adjustedRule.valid = valid;
      return adjustedRule;
    });
    setPasswordRules(adjustedPasswordRules);
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
            onChange={nextValue => onChange(nextValue)}
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
              info={
                <List
                  data={passwordRules}
                  border={{ color: 'none' }}
                  pad="none"
                >
                  {rule => {
                    if (
                      formValues.password === undefined ||
                      formValues.password.length === 0
                    ) {
                      return (
                        <Box direction="row" gap="xsmall">
                          <Text>{rule.message}</Text>
                        </Box>
                      );
                    }
                    return (
                      <Box direction="row" gap="xsmall">
                        {formValues.password && rule.valid ? (
                          <FormCheckmark color="text-strong" />
                        ) : (
                          <FormClose color="text-strong" />
                        )}
                        <Text size="xsmall">{rule.message}</Text>
                      </Box>
                    );
                  }}
                </List>
              }
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
              <Button label="Sign Up" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
