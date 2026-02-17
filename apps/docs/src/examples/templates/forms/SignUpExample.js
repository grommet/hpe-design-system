import React, { useContext } from 'react';
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
  ResponsiveContext,
} from 'grommet';
import { Checkmark } from '@hpe-design/icons-grommet';
import {
  emailMask,
  emailValidation,
  passwordRequirements,
  passwordRulesStrong,
} from './utils/FormValidation';
import { ContentPane } from '../../../layouts/content/ContentPane';

export const SignUpExample = () => {
  const [formValues, setFormValues] = React.useState({
    email: 'jane.smith@hpe.com',
    fullName: '',
    password: '',
  });
  const [passwordRules, setPasswordRules] = React.useState(passwordRulesStrong);
  const size = useContext(ResponsiveContext);

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
    <ContentPane gap="medium" width="medium">
      <Header
        direction="column"
        align="start"
        gap="5xsmall"
        pad={{ horizontal: '5xsmall' }}
      >
        {/* Use semantically correct heading level and adjust size as 
        needed. In this instance, this example is presented within an 
        HTML section element and this is the first heading within the 
        section, therefor h2 is the semantically correct heading. For 
        additional detail, see https://design-system.hpe.design/foundation/typography#semantic-usage-of-heading-levels). */}
        <Heading level={2} margin="none">
          Sign Up
        </Heading>
        <Text>for a Hewlett Packard Enterprise account</Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: '5xsmall' }}
      >
        <Form
          validate="blur"
          value={formValues}
          messages={{
            required: 'This is a required field.',
          }}
          onChange={nextValue => onChange(nextValue)}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <FormField
            label="Email"
            htmlFor="email-sign-up"
            name="email"
            validate={emailValidation}
            required={{ indicator: false }}
          >
            <MaskedInput
              id="email-sign-up"
              name="email"
              mask={emailMask}
              type="email"
            />
          </FormField>
          <FormField
            label="Full name"
            htmlFor="fullName-sign-up"
            name="fullName"
            required={{ indicator: false }}
          >
            <TextInput
              id="fullName-sign-up"
              name="fullName"
              placeholder="Jane Smith"
            />
          </FormField>
          <FormField
            label="Password"
            validate={passwordRequirements}
            htmlFor="password-sign-up"
            name="password"
            required={{ indicator: false }}
            info={
              <List data={passwordRules} border={{ color: 'none' }} pad="none">
                {rule => {
                  if (
                    formValues.password === undefined ||
                    formValues.password.length === 0
                  ) {
                    return (
                      <Box direction="row" gap="3xsmall">
                        <Text size="xsmall">{rule.message}</Text>
                      </Box>
                    );
                  }
                  return (
                    <Box direction="row" gap="3xsmall">
                      {formValues.password && rule.valid && (
                        <Box alignSelf="center">
                          <Checkmark size="small" />
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
              id="password-sign-up"
              name="password"
              placeholder="Enter your password"
              type="password"
            />
          </FormField>
          <FormField
            required
            htmlFor="terms-and-privacy"
            name="termsAndPrivacy"
          >
            <CheckBox
              id="terms-and-privacy"
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
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'xsmall' }}
          >
            <Button label="Sign Up" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
