import React from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Header,
  Heading,
  Text,
  TextInput,
} from 'grommet';
import { Apple } from 'grommet-icons';
import { FormContainer } from '.';

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
                color="text-weak"
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
              <FormField name="cardNumber" label="Credit Card Number">
                <TextInput
                  id="cardNumber"
                  name="cardNumber"
                  reverse
                  placeholder="0000 0000 0000 0000"
                  icon={<Apple color='status-disabled'/>}
                 />
              </FormField>
            <Box direction="row" gap="medium">
              <Box flex={false}>
                <FormField name="expiration" label="Expires on">
                  <TextInput
                    id="expiration"
                    name="expiration"
                    placeholder="MM/YY"
                   />
                </FormField>
              </Box>
              <Box fill>
                <FormField name="cvv" label="CVV">
                  <TextInput id="cvv" name="cvv" placeholder="123" />
                </FormField>
              </Box>
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Check out" primary type="submit" />
            </Box>
          </Form>
        </Box>
      </Box>
    </FormContainer>
  );
};
