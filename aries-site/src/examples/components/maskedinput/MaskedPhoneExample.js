import React, { useState } from 'react';
import { FormField, MaskedInput } from 'grommet';

const maskPhone = [
  { fixed: '(' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'xxx',
  },
  { fixed: ')' },
  { fixed: ' ' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'xxx',
  },
  { fixed: '-' },
  {
    length: 4,
    regexp: /^[0-9]{1,4}$/,
    placeholder: 'xxxx',
  },
];

export const MaskedPhoneExample = () => {
  const [phone, setPhone] = useState('');

  return (
    <FormField label="Phone" htmlFor="masked-phone">
      <MaskedInput
        id="masked-phone"
        mask={maskPhone}
        value={phone}
        onChange={event => setPhone(event.target.value)}
      />
    </FormField>
  );
};
