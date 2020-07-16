import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  MaskedInput,
  Select,
  Text,
  TextInput,
} from 'grommet';

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

const states = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'ME',
  'MD',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NV',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
];

const phoneMask = [
  { fixed: '(' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'XXX',
  },
  { fixed: ')' },
  { fixed: ' ' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'XXX',
  },
  { fixed: '-' },
  {
    length: 4,
    regexp: /^[0-9]{1,4}$/,
    placeholder: 'XXXX',
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

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

const FormFieldRequiredLabel = props => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={
        required ? (
          <Box direction="row">
            <Text size="xsmall">{label}</Text>
            <Text size="xsmall">*</Text>
          </Box>
        ) : (
          label
        )
      }
      required={required}
      {...rest}
    />
  );
};

FormFieldRequiredLabel.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
};

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
            messages={{
              required: '! This is required',
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <Box>
              <Heading level={4} margin={{ bottom: 'small', top: 'none' }}>
                Shipping Information
              </Heading>
              <Text margin={{ horizontal: 'small', vertical: 'xsmall' }}>
                Shipping Address *
              </Text>
              <FormField required htmlFor="firstName" name="firstName">
                <TextInput
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                />
              </FormField>
              <FormField required htmlFor="lastName" name="lastName">
                <TextInput
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                />
              </FormField>
              <FormField required htmlFor="address1" name="address1">
                <TextInput
                  id="address1"
                  name="address1"
                  placeholder="Street Address"
                />
              </FormField>
              <FormField htmlFor="address2" name="address2">
                <TextInput
                  id="address2"
                  name="address2"
                  placeholder="Apt., Suite, Building (Optional)"
                />
              </FormField>
              <FormField required htmlFor="city" name="city">
                <TextInput id="city" name="city" placeholder="City" />
              </FormField>
              <FormField required htmlFor="state" name="state">
                <Select
                  id="state"
                  name="state"
                  dropHeight="small"
                  options={states}
                  placeholder="Select State"
                />
              </FormField>
              <FormField required htmlFor="zipcode" name="zipcode">
                <TextInput id="zipcode" name="zipcode" placeholder="Zipcode" />
              </FormField>
              <FormField htmlFor="isBusiness" name="isBusiness">
                <CheckBox name="isBusiness" label="This is a business" />
              </FormField>
            </Box>
            <Box>
              <Heading level={4} margin={{ bottom: 'small' }}>
                Contact Information
              </Heading>
              <FormField htmlFor="phone-ship" name="phone" label="Phone Number">
                <MaskedInput id="phone-ship" name="phone" mask={phoneMask} />
              </FormField>
              <FormFieldRequiredLabel
                htmlFor="email-ship"
                name="email"
                required
                label="Email Address"
                validate={emailValidation}
              >
                <MaskedInput id="email-ship" name="email" mask={emailMask} />
              </FormFieldRequiredLabel>
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
