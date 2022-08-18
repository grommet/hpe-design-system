import React, { useContext } from 'react';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  MaskedInput,
  ResponsiveContext,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { emailMask, emailValidation, phoneMask, states } from '../utils/FormValidation';

export const ColumnFormDont = () => {
  const [formValues, setFormValues] = React.useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    isBusiness: '',
    'fullName-shipping': '',
    'phone-shipping': '',
    'email-shipping': '',
  });
  const size = useContext(ResponsiveContext);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  // provide order of formfields for validation
  // to properly place focus on any errors or infos
  const formFields = [
    'address1',
    'address2',
    'city',
    'state',
    'zipcode',
    'isBusiness',
    'fullName-shipping',
    'phone-shipping',
    'email-shipping',
  ];

  // On long forms, we want to focus the first of any fields that
  // return an error or info message. This removes the need for the
  // user to scroll to find which field blocked form submission.
  const onValidate = validationResults => {
    const target = formFields.find(
      field =>
        field in validationResults.errors || field in validationResults.infos,
    );
    if (target) {
      const targetFormField = document.getElementsByName(target);
      targetFormField[0].focus();
    }
  };

  return (
    <Box gap="medium">
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
          Shipping
        </Heading>
        <Text>for your HPE products</Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: 'xxsmall' }}
      >
        <Form
          value={formValues}
          onChange={setFormValues}
          messages={{
            required: 'This is a required field.',
          }}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          onValidate={onValidate}
          method="post"
          validate="submit"
        >
          <Box gap="large" direction="row">
            <Box>
              <Text size="large" margin={{ bottom: 'xsmall', top: 'none' }}>
                Shipping Information
              </Text>
              <Text
                margin={{ horizontal: 'none', vertical: 'xsmall' }}
                size="xsmall"
              >
                Shipping Address *
              </Text>
              <FormField
                contentProps={{ width: 'medium' }}
                htmlFor="address1"
                name="address1"
                label="Address 1"
              >
                <TextInput
                  id="address1"
                  name="address1"
                  placeholder="Street Address"
                />
              </FormField>
              <FormField
                contentProps={{ width: 'medium' }}
                htmlFor="address2"
                name="address2"
                label="Address 2"
              >
                <TextInput
                  id="address2"
                  name="address2"
                  placeholder="Apt., Suite, Building (Optional)"
                />
              </FormField>
              <FormField
                contentProps={{ width: 'medium' }}
                htmlFor="city"
                name="city"
                label="City"
              >
                <TextInput id="city" name="city" />
              </FormField>
              <FormField
                contentProps={{ width: 'medium' }}
                htmlFor="state__input"
                name="state"
                label="State"
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
                contentProps={{ width: 'medium' }}
                htmlFor="zipcode"
                name="zipcode"
                label="ZIP Code"
              >
                <TextInput id="zipcode" name="zipcode" />
              </FormField>
              <FormField
                contentProps={{ width: 'medium' }}
                htmlFor="isBusiness"
                name="isBusiness"
              >
                <CheckBox name="isBusiness" label="This is a business" />
              </FormField>
            </Box>
            <Box>
              <Text size="large" margin={{ vertical: 'small' }}>
                Contact Information
              </Text>
              <FormField
                label="Full Name"
                required
                htmlFor="fullName"
                name="fullName-shipping"
                contentProps={{ width: 'medium' }}
              >
                <TextInput id="fullName" name="fullName-shipping" />
              </FormField>
              <FormField
                htmlFor="phone-ship"
                contentProps={{ width: 'medium' }}
                name="phone-shipping"
                label="Phone Number"
              >
                <MaskedInput
                  id="phone-ship"
                  name="phone-shipping"
                  mask={phoneMask}
                />
              </FormField>
              <FormField
                htmlFor="email-ship"
                name="email-shipping"
                required
                label="Email Address"
                validate={emailValidation}
                contentProps={{ width: 'medium' }}
              >
                <MaskedInput
                  id="email-ship"
                  name="email-shipping"
                  mask={emailMask}
                />
              </FormField>
              <Box
                align={
                  !['xsmall', 'small'].includes(size) ? 'start' : undefined
                }
                margin={{ top: 'small', bottom: 'small' }}
              >
                <Button label="Continue" primary type="submit" />
              </Box>
            </Box>
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
