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
  Main,
  Text,
  TextInput,
} from 'grommet';

import { FormContainer } from '.';

export const SignUpExample = () => {
  const [formValues, setFormValues] = React.useState({
    email: 'jane.smith@hpe.com',
  });

  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    console.log(touched);
    console.log(value);
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
              type="email"
            />
            <FormField
              name="fullName"
              label="Full Name"
              component={TextInput}
              placeholder="Jane Smith"
            />
            <FormField
              name="password"
              label="Password"
              component={TextInput}
              type="password"
              placeholder="•••••••••••••••"
            />
            <CheckBox
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
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Sign up" primary type="submit" />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
