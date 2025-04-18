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
import { FormCheckmark } from 'grommet-icons';
import {
  emailMask,
  emailValidation,
  passwordRequirements,
  passwordRulesStrong,
} from './utils/FormValidation';
import { ContentPane } from '../../../layouts';

export const SimpleSignUpExample = () => {
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
        gap="xxsmall"
        pad={{ horizontal: 'xxsmall' }}
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
        pad={{ horizontal: 'xxsmall' }}
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
            htmlFor="email-sign-up-simple"
            name="email"
            validate={emailValidation}
            required={{ indicator: false }}
          >
            <MaskedInput
              id="email-sign-up-simple"
              name="email"
              mask={emailMask}
              type="email"
            />
          </FormField>
          <FormField
            label="Full name"
            htmlFor="fullName-sign-up-simple"
            name="fullName"
            required={{ indicator: false }}
          >
            <TextInput
              id="fullName-sign-up-simple"
              name="fullName"
              placeholder="Jane Smith"
            />
          </FormField>
          <FormField
            required={{ indicator: false }}
            label="Password"
            validate={passwordRequirements}
            htmlFor="password-sign-up-simple"
            name="password"
            info={
              <List data={passwordRules} border={{ color: 'none' }} pad="none">
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
          <FormField htmlFor="terms-and-privacy-simple" name="termsAndPrivacy">
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
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Sign Up" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
