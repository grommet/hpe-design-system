import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  FormField,
  MaskedInput,
  Header,
  Text,
  TextInput,
} from 'grommet';
import { Apple, CreditCard } from 'grommet-icons';

const currentDate = new Date();
const dateValidation = [
  date => {
    const expireDate = date.split('/').reverse();
    expireDate.splice(0, 0, '20');
    const newYear = expireDate[0] + expireDate[1];
    expireDate.splice(0, 2, newYear);
    const expires = new Date(expireDate);
    if (
      expires.getMonth() < currentDate.getMonth() &&
      expires.getFullYear() <= currentDate.getFullYear()
    )
      return { message: 'invalid date', status: 'error' };
    return undefined;
  },
];

const dateMask = [
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: 'MM',
  },
  { fixed: '/' },
  {
    length: 2,
    options: Array.from({ length: 6 }, (v, k) => 20 + k),
    regexp: /^2[0,1-5]$|^2?$/,
    placeholder: 'YY',
  },
];

const cvvMask = [
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: '123',
  },
];

const creditCardRegExp = /^[0-9]{1,4}$/;

const creditCardMask = [
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
  { fixed: ' ' },
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
  { fixed: ' ' },
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
  { fixed: ' ' },
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
];

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

const FormContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" border round="small" overflow="hidden">
      <Box flex pad={{ horizontal: 'medium', vertical: 'medium' }} {...rest} />
    </Box>
  );
};

export const PayExample = () => {
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
          <Text size="xxlarge" weight="bold">
            Pay
          </Text>
          <Text>for your HPE products</Text>
        </Header>
        <Box
          // Padding used to prevent focus from being cutoff
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            messages={{
              required: '! This is a required field.',
            }}
            value={formValues}
            onChange={setFormValues}
            onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          >
            <Box>
              <Button
                label="Pay"
                type="button"
                primary
                color="border"
                icon={<Apple />}
                gap="xxsmall"
                size="large"
              />
            </Box>
            <Box margin="small" align="center">
              <Text color="text-xweak">or</Text>
            </Box>
            <Text size="large" margin={{ bottom: 'small', top: 'none' }}>
              Credit Card Information
            </Text>
            <RequiredFormField
              name="cardName"
              required
              htmlFor="cardName"
              label="Name on Card"
            >
              <TextInput
                id="cardName"
                name="cardName"
                placeholder="Jane Smith"
              />
            </RequiredFormField>
            <RequiredFormField
              htmlFor="cardNumber"
              required
              name="cardNumber"
              label="Credit Card Number"
            >
              <MaskedInput
                id="cardNumber"
                name="cardNumber"
                reverse
                mask={creditCardMask}
                icon={<CreditCard color="placeholder" />}
              />
            </RequiredFormField>
            <Box direction="row" gap="medium">
              <Box flex={false}>
                <RequiredFormField
                  required
                  htmlFor="expiration"
                  name="expiration"
                  label="Expires on"
                  validate={dateValidation}
                >
                  <MaskedInput
                    id="expiration"
                    name="expiration"
                    mask={dateMask}
                  />
                </RequiredFormField>
              </Box>
              <Box fill>
                <RequiredFormField
                  required
                  htmlFor="cvv"
                  name="cvv"
                  label="CVV"
                >
                  <MaskedInput
                    mask={cvvMask}
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                  />
                </RequiredFormField>
              </Box>
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Checkout" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
