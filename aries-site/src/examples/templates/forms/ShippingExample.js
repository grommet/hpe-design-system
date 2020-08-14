import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Header,
  MaskedInput,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { CircleAlert } from 'grommet-icons';

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

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

const RequiredFormField = props => {
  const { required, label, ...rest } = props;
  return (
    <FormField
      label={required ? `${label}*` : label}
      required={required}
      {...rest}
    />
  );
};

RequiredFormField.propTypes = {
  required: PropTypes.bool,
  label: PropTypes.string,
};

export const ShippingExample = () => {
  const [formValues, setFormValues] = React.useState({});

  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
  };

  // provide order of formfields for validation
  // to properly place focus on any errors or infos
  const formFields = [
    'firstName',
    'lastName',
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
    <FormContainer width="medium">
      <Box gap="medium">
        <Header
          direction="column"
          align="start"
          gap="xxsmall"
          pad={{ horizontal: 'xxsmall' }}
        >
          <Text size="xxlarge" weight="bold">
            Shipping
          </Text>
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
              required: (
                <Error background="background-front">
                  This is a required field.
                </Error>
              ),
            }}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
            onValidate={onValidate}
            validate="submit"
          >
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
              <FormField htmlFor="address1" name="address1">
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
              <FormField htmlFor="city" name="city">
                <TextInput id="city" name="city" placeholder="City" />
              </FormField>
              <FormField htmlFor="state" name="state">
                <Select
                  id="state"
                  name="state"
                  dropHeight="small"
                  options={states}
                  placeholder="Select State"
                />
              </FormField>
              <FormField htmlFor="zipcode" name="zipcode">
                <TextInput id="zipcode" name="zipcode" placeholder="Zipcode" />
              </FormField>
              <FormField htmlFor="isBusiness" name="isBusiness">
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
              >
                <TextInput
                  id="fullName"
                  name="fullName-shipping"
                  placeholder="Full Name"
                />
              </FormField>
              <FormField
                htmlFor="phone-ship"
                name="phone-shipping"
                label="Phone Number"
              >
                <MaskedInput
                  id="phone-ship"
                  name="phone-shipping"
                  mask={phoneMask}
                />
              </FormField>
              <RequiredFormField
                htmlFor="email-ship"
                name="email-shipping"
                required
                label="Email Address"
                validate={emailValidation}
              >
                <MaskedInput
                  id="email-ship"
                  name="email-shipping"
                  mask={emailMask}
                />
              </RequiredFormField>
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
