import React, { useState } from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

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
  { fixed: ' - ' },
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

export function MaskedIPRangeExample() {
  const [value, setValue] = useState('');

  return (
    <Form>
      <FormField
        label="IP Range"
        htmlFor="masked-ip-range"
        name="maskedIpRange"
      >
        <MaskedInput
          name="maskedIpRange"
          id="masked-ip-range"
          mask={maskIp}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </FormField>
    </Form>
  );
}
