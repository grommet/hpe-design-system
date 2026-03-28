import React from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

const IPv4ElementExp =
  /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

const maskIp = [
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
];

export const MaskedIPAddressExample = () => (
  <Form>
    <FormField
      label="IP address"
      htmlFor="masked-ip-address"
      name="maskedIpAddress"
    >
      <MaskedInput
        name="maskedIpAddress"
        id="masked-ip-address"
        mask={maskIp}
      />
    </FormField>
  </Form>
);
