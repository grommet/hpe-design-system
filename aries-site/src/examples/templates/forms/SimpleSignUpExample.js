import React from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  List,
  Form,
  FormField,
  Header,
  MaskedInput,
  Text,
  TextInput,
} from 'grommet';
import { FormCheckmark, CircleAlert } from 'grommet-icons';

const Error = ({ children, ...rest }) => {
  return (
    <Box direction="row" gap="xsmall" {...rest}>
      <Box flex={false} margin={{ top: 'hair' }} pad={{ top: 'xxsmall' }}>
        <CircleAlert size="small" />
      </Box>
      <Text size="xsmall">{children}</Text>
    </Box>
  );
};

Error.propTypes = {
  children: PropTypes.object,
};

const passwordRequirements = [
  {
    regexp: new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}'),
    message: (
      <Error background="background-front">
        Password requirements not met.
      </Error>
    ),
    status: 'error',
  },
];

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
    message: (
      <Error background="background-front">Enter a valid email address.</Error>
    ),
    status: 'error',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: (
      <Error background="background-front">Enter a valid email address.</Error>
    ),
    status: 'error',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: (
      <Error background="background-front">Enter a valid email address.</Error>
    ),
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
          <Text size="xxlarge" weight="bold">
            Sign Up
          </Text>
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
              validate={passwordRequirements}
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
                          <Text size="xsmall">{rule.message}</Text>
                        </Box>
                      );
                    }
                    return (
                      <Box direction="row" gap="xsmall">
                        {formValues.password && rule.valid && (
                          <Box alignSelf="center">
                            <FormCheckmark size="small" />
                          </Box>
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
                placeholder="Enter your password"
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
