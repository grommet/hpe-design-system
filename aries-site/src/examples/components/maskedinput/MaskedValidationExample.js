import React from 'react';
import { Box, Button, FormField, Form, MaskedInput } from 'grommet';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

export const MaskedValidationExample = () => {
  return (
    <Form>
      <FormField
        label="IP Address"
        name="maskedIpAddressValidation"
        htmlFor="masked-ip-address-validation"
        validate={{
          regexp: /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/,
          message: 'Invalid IP address',
        }}
      >
        <MaskedInput
          name="maskedIpAddressValidation"
          id="masked-ip-address-validation"
          mask={[
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
            { fixed: '.' },
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
            { fixed: '.' },
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
            { fixed: '.' },
            {
              length: [1, 3],
              regexp: IPv4ElementExp,
              placeholder: 'xxx',
            },
          ]}
        />
      </FormField>
      <Box direction="row" gap="small">
        <Button type="submit" label="Validate" primary />
        <Button type="reset" label="Reset" />
      </Box>
    </Form>
  );
};
