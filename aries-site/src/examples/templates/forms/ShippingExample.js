import React from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  Header,
  Heading,
  MaskedInput,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { FormField } from 'aries-core';

import { FormContainer } from '.';
import { emailMask, emailValidation, phoneMask, states } from './formHelpers';

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
            <Box>
              <Heading level={4} margin={{ bottom: 'small', top: 'none' }}>
                Shipping Information
              </Heading>
              <Text margin={{ horizontal: 'small', vertical: 'xsmall' }}>
                Shipping Address
              </Text>
              <FormField
                htmlFor="firstName"
                name="firstName"
                label="First Name"
                visuallyHidden
              >
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </FormField>
              <FormField
                htmlFor="lastName"
                name="lastName"
                label="Last Name"
                visuallyHidden
              >
                <TextInput
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </FormField>
              <FormField
                htmlFor="address1"
                name="address1"
                label="Street Address"
                visuallyHidden
              >
                <TextInput
                  id="address1"
                  name="address1"
                  placeholder="Street Address"
                />
              </FormField>
              <FormField
                htmlFor="address2"
                name="address2"
                label="Apartment, Suite, etc., (Optional)"
                visuallyHidden
              >
                <TextInput
                  id="address2"
                  name="address2"
                  placeholder="Apt., Suite, Building (Optional)"
                />
              </FormField>
              <FormField htmlFor="city" name="city" label="City" visuallyHidden>
                <TextInput id="city" name="city" placeholder="City" />
              </FormField>
              <FormField
                htmlFor="state__input"
                name="state"
                label="State"
                visuallyHidden
              >
                <Select
                  id="state"
                  name="state"
                  dropHeight="small"
                  options={states}
                  placeholder="Select State"
                />
              </FormField>
              <FormField
                htmlFor="zipcode"
                name="zipcode"
                label="Zipcode"
                visuallyHidden
              >
                <TextInput id="zipcode" name="zipcode" placeholder="Zipcode" />
              </FormField>
              <CheckBox name="isBusiness" label="This is a business" />
            </Box>
            <Box>
              <Heading level={4} margin={{ bottom: 'small' }}>
                Contact Information
              </Heading>
              <FormField htmlFor="phone-ship" name="phone" label="Phone Number">
                <MaskedInput id="phone-ship" name="phone" mask={phoneMask} />
              </FormField>
              <FormField
                htmlFor="email-ship"
                name="email"
                label="Email Address"
                validate={emailValidation}
              >
                <MaskedInput id="email-ship" name="email" mask={emailMask} />
              </FormField>
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Continue" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
