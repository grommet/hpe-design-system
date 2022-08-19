import React from 'react';
import { Box, CheckBox, FormField, Select, Text, TextInput } from 'grommet';
import { states } from '../utils/FormValidation';

export const ShippingInfomation = () => (
  <Box>
    <Text size="large" margin={{ bottom: 'xsmall', top: 'none' }}>
      Shipping Information
    </Text>
    <Text margin={{ horizontal: 'none', vertical: 'xsmall' }} size="xsmall">
      Shipping Address *
    </Text>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="address1"
      name="address1"
      label="Address 1"
    >
      <TextInput id="address1" name="address1" placeholder="Street Address" />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="address2"
      name="address2"
      label="Address 2"
    >
      <TextInput
        id="address2"
        name="address2"
        placeholder="Apt., Suite, Building (Optional)"
      />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="city"
      name="city"
      label="City"
    >
      <TextInput id="city" name="city" />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="state__input"
      name="state"
      label="State"
    >
      <Select
        id="state"
        name="state"
        dropHeight="small"
        options={states}
        placeholder="Select State"
      />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="zipcode"
      name="zipcode"
      label="ZIP Code"
    >
      <TextInput id="zipcode" name="zipcode" />
    </FormField>
    <FormField
      contentProps={{ width: 'medium' }}
      htmlFor="isBusiness"
      name="isBusiness"
    >
      <CheckBox name="isBusiness" label="This is a business" />
    </FormField>
  </Box>
);
