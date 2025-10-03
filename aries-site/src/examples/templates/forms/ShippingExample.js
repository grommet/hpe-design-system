import React, { useContext } from 'react';
import {
  Box,
  Button,
  Form,
  Header,
  Heading,
  Text,
  ResponsiveContext,
} from 'grommet';
import { ContentPane } from '../../../layouts';
import { ShippingInfomation, ContactInformation } from './Shipping';

export const ShippingExample = () => {
  const size = useContext(ResponsiveContext);
  const [formValues, setFormValues] = React.useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipcode: '',
    isBusiness: '',
    'full-name': '',
    'phone-shipping': '',
    'email-shipping': '',
  });

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
    'full-name',
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
    <ContentPane gap="medium">
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
          Shipping
        </Heading>
        <Text>for your HPE products</Text>
      </Header>
      <Box
        // Padding used to prevent focus from being cutoff
        pad={{ horizontal: '5xsmall' }}
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
          <ShippingInfomation name="shippingExample" />
          <ContactInformation name="shippingExample" />
          <Box
            align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
            margin={{ top: 'xsmall', bottom: 'xsmall' }}
          >
            <Button label="Continue" primary type="submit" />
          </Box>
        </Form>
      </Box>
    </ContentPane>
  );
};
