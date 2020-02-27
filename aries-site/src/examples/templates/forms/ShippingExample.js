import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Main,
  Text,
  TextInput,
  CheckBox,
} from 'grommet';

import { FormContainer } from '.';

export const ShippingExample = () => {
  const [formValues, setFormValues] = React.useState({});

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
            Shipping
          </Heading>
          <Text>for your HPE products</Text>
        </Header>
        <Main
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <Box>
              <Heading level={4} margin={{ bottom: 'small' }}>
                Shipping Information
              </Heading>
              <Text>Shipping Address</Text>
              <FormField
                name="firstName"
                component={TextInput}
                placeholder="First Name"
              />
              <FormField
                name="lastName"
                component={TextInput}
                placeholder="Last Name"
              />
              <FormField
                name="address1"
                component={TextInput}
                placeholder="Street Address"
              />
              <FormField
                name="address2"
                component={TextInput}
                placeholder="Apt., Suite, Building (Optional)"
              />
              <FormField
                name="zipcode"
                component={TextInput}
                placeholder="Zipcode"
              />
              <FormField
                name="isBusiness"
                label="This is a business"
                component={CheckBox}
              />
            </Box>
            <Box>
              <Heading level={4} margin={{ bottom: 'small' }}>
                Contact Information
              </Heading>
              <FormField
                name="phone"
                label="Phone Number"
                component={TextInput}
                placeholder="(XXX) XXX - XXXX"
              />
              <FormField
                name="email"
                label="Email Address"
                component={TextInput}
                placeholder="james@hpe.com"
              />
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Continue" primary type="submit" />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
