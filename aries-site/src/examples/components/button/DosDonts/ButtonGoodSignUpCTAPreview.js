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
import { ContentPane } from '../../../../layouts';

export const ButtonGoodSignUpCTAPreview = () => {
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
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <FormField
            label="Full name"
            htmlFor="fullName-sign-up-good"
            name="fullName"
            required={{ indicator: false }}
          >
            <TextInput
              id="fullName-sign-up-good"
              name="fullName"
              value="Jane Doe"
            />
          </FormField>
          <FormField
            label="Email"
            htmlFor="email-sign-up-good"
            name="email"
            required={{ indicator: false }}
          >
            <MaskedInput
              value="johndoe@hpe.com"
              id="email-sign-up-good"
              name="email"
              type="email"
            />
          </FormField>
          <FormField
            required={{ indicator: false }}
            label="Password"
            htmlFor="password-sign-up-good"
            name="password"
          >
            <TextInput
              id="password-sign-up-good"
              name="password"
              placeholder="Enter your password"
              type="password"
              value="password"
            />
          </FormField>
          <FormField htmlFor="terms-and-privacy-good" name="termsAndPrivacy">
            <CheckBox
              id="terms-and-privacy-good"
              name="termsAndPrivacy"
              checked
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
          <Box margin={{ top: 'medium', bottom: 'xsmall' }}>
            <Button label="Sign Up" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
