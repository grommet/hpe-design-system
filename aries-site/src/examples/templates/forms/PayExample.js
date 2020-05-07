import React from 'react';
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
} from 'grommet';
import { Apple, CreditCard } from 'grommet-icons';
import { FormContainer } from '.';
import {
  creditCardMask,
  cvvMask,
  dateMask,
  dateValidation,
} from './formHelpers';

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
          <Heading level={3} margin="none">
            Pay
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
            <Heading level={4} margin={{ bottom: 'small', top: 'none' }}>
              Credit Card Information
            </Heading>
            <FormField name="cardName" htmlFor="cardName" label="Name on Card">
              <TextInput
                id="cardName"
                name="cardName"
                placeholder="Jane Smith"
              />
            </FormField>
            <FormField
              htmlFor="cardNumber"
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
            </FormField>
            <Box direction="row" gap="medium">
              <Box flex={false}>
                <FormField
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
                <FormField htmlFor="cvv" name="cvv" label="CVV">
                  <MaskedInput
                    mask={cvvMask}
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                  />
                </FormField>
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
