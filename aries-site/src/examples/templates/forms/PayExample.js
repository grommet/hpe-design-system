import React, { useContext } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  MaskedInput,
  Header,
  Heading,
  Text,
  TextInput,
  ResponsiveContext,
} from 'grommet';
import { Apple, CreditCard } from 'grommet-icons';
import { ContentPane } from '../../../layouts';

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

export const PayExample = () => {
  const [formValues, setFormValues] = React.useState({
    cardName: '',
    cardNumber: '',
    expiration: '',
    cvv: '',
  });
  const size = useContext(ResponsiveContext);

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
          Pay
        </Heading>
        <Text>for your HPE products</Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: '5xsmall' }}
      >
        <Form
          messages={{
            required: 'This is a required field.',
          }}
          value={formValues}
          onChange={setFormValues}
          onSubmit={({ value, touched }) => onSubmit({ value, touched })}
          method="post"
        >
          <Box>
            <Button
              label="Pay"
              type="button"
              primary
              color="background-neutral-xstrong"
              icon={<Apple />}
              gap="5xsmall"
              size="large"
            />
          </Box>
          <Box margin="xsmall" align="center">
            <Text>or</Text>
          </Box>
          <Text size="large" margin={{ bottom: 'xsmall', top: 'none' }}>
            Credit card information
          </Text>
          <FormField
            name="cardName"
            required
            htmlFor="cardName"
            label="Name on card"
          >
            <TextInput id="cardName" name="cardName" placeholder="Jane Smith" />
          </FormField>
          <FormField
            htmlFor="cardNumber"
            required
            name="cardNumber"
            label="Credit card number"
          >
            <MaskedInput
              id="cardNumber"
              name="cardNumber"
              reverse
              mask={creditCardMask}
              icon={<CreditCard color="placeholder" />}
            />
          </FormField>
          <Box direction="row" gap="medium">
            <Box flex={false}>
              <FormField
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
              </FormField>
            </Box>
            <Box fill>
              <FormField required htmlFor="cvv" name="cvv" label="CVV">
                <MaskedInput
                  mask={cvvMask}
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                />
              </FormField>
            </Box>
          </Box>
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'xsmall', bottom: 'xsmall' }}
          >
            <Button label="Checkout" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
