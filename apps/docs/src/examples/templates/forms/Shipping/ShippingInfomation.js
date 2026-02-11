import React from 'react';
import { Box, CheckBox, FormField, Select, Text, TextInput } from 'grommet';
import PropTypes from 'prop-types';
import { states } from '../utils/FormValidation';

export const ShippingInfomation = ({ name }) => (
  <Box>
    <Text size="large" margin={{ bottom: '3xsmall', top: 'none' }}>
      Shipping information
    </Text>
    <Text margin={{ horizontal: 'none', vertical: '3xsmall' }} size="xsmall">
      Shipping address *
    </Text>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor={`address1-${name}`}
      name="address1"
      label="Address 1"
    >
      <TextInput
        id={`address1-${name}`}
        name="address1"
        placeholder="Street Address"
      />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor={`address2-${name}`}
      name="address2"
      label="Address 2"
    >
      <TextInput
        id={`address2-${name}`}
        name="address2"
        placeholder="Apt., suite, building (optional)"
      />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor={`city-${name}`}
      name="city"
      label="City"
    >
      <TextInput id={`city-${name}`} name="city" />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor={`state-shipping-${name}`}
      name="state"
      label="State"
    >
      <Select
        name="state"
        id={`state-shipping-${name}`}
        dropHeight="small"
        options={states}
        placeholder="Select state"
      />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor={`zipcode-${name}`}
      name="zipcode"
      label="ZIP code"
    >
      <TextInput id={`state-shipping-${name}`} name="zipcode" />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor={`is-business-${name}`}
      name="isBusiness"
    >
      <CheckBox
        id={`is-business-${name}`}
        name="isBusiness"
        label="This is a business"
      />
    </FormField>
  </Box>
);

ShippingInfomation.propTypes = {
  name: PropTypes.string.isRequired,
};
