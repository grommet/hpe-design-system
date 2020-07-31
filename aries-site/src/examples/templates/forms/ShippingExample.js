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

const emailErrorMessage = 'Enter a valid email address.';
const requiredErrorMessage = '! This is a required field.';

const emailValidation = [
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    message: emailErrorMessage,
    status: 'error',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: emailErrorMessage,
    status: 'error',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: emailErrorMessage,
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

// once check dom function is ran to find the
// correct error span we want to get that parent node
// and set focus on the input within that parent node.

const setFocus = errors => {
  const FormFieldBox = errors.parentNode;
  const inputArea = FormFieldBox.querySelectorAll('input');
  inputArea[0].focus();
};

export const ShippingExample = () => {
  const [errors, setErrors] = React.useState(undefined);
  const [formValues, setFormValues] = React.useState({});

  // Problem
  // Currently checkdom function is being called onClick with
  // button. This causes the issue that the dom is not updated
  // in time for checkdom to work correctly. On the first click 
  // of button the validation is being checked at the same time 
  // checkdom is searching the dom which is why only on the second
  // click checkdom is finding the correct span. The span does 
  // not exists in time. 
  // A solution would be to be able to wait until the error span 
  // is in the dom to run the checkdom function


  // With checkdom function
  // We want to be able to check the dom for any text that
  // is an error message every time the error is updated.
  // we can loop through all of the span tags to get the
  // first one that contains the error message.

  React.useEffect(() => {
    if (errors) {
      setFocus(errors);
    }
  }, [errors]);
  const checkdom = () => {
    const spanTags = document.getElementsByTagName('span');
    const requiredText = requiredErrorMessage;
    const emailText = emailErrorMessage;
    let found;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < spanTags.length; i++) {
      if (
        spanTags[i].textContent === requiredText ||
        spanTags[i].textContent === emailText
      ) {
        found = spanTags[i];
        break;
      }
    }

    setErrors(found);
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
            Shipping
          </Text>
          <Text>for your HPE products</Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            validate="submit"
            value={formValues}
            messages={{ required: requiredErrorMessage }}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
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
              <FormField htmlFor="lastName" name="lastName">
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
                name="fullName"
              >
                <TextInput
                  id="fullName"
                  name="fullName"
                  placeholder="Full Name"
                />
              </FormField>
              <FormField htmlFor="phone-ship" name="phone" label="Phone Number">
                <MaskedInput id="phone-ship" name="phone" mask={phoneMask} />
              </FormField>
              <RequiredFormField
                htmlFor="email-ship"
                name="email"
                required
                label="Email Address"
                validate={emailValidation}
              >
                <MaskedInput id="email-ship" name="email" mask={emailMask} />
              </RequiredFormField>
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button
                onClick={checkdom}
                label="Continue"
                primary
                type="submit"
              />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
