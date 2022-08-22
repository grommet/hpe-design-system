import React, { useContext } from 'react';
import {
  Box,
  Button,
  Form,
  Header,
  Heading,
  ResponsiveContext,
  Text,
} from 'grommet';
import { ContactInformation, ShippingInfomation } from './Shipping';

export const ShippingExample = () => {
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
    <Box gap="medium" width="medium">
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
          <ShippingInfomation />
          <ContactInformation />
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'small', bottom: 'small' }}
          >
            <Button label="Continue" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};
