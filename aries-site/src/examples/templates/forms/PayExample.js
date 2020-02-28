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
            <Text color="text-xweak">or</Text>
            <FormField
              name="cardName"
              label="Name on Card"
              component={TextInput}
              placeholder="Jane Smith"
            />
            <FormField
              name="cardNumber"
              label="Credit Card Number"
              component={TextInput}
            />
            <Box direction="row" gap="medium">
              <Box flex={false}>
                <FormField
                  name="expiration"
                  label="Expires on"
                  component={TextInput}
                  placeholder="MM/YY"
                />
              </Box>
              <Box fill>
                <FormField
                  name="cvv"
                  label="CVV"
                  component={TextInput}
                  placeholder="123"
                />
              </Box>
            </Box>
            <Box align="start" margin={{ top: 'medium', bottom: 'small' }}>
              <Button label="Check out" primary type="submit" />
            </Box>
          </Form>
        </Main>
      </Box>
    </FormContainer>
  );
};
