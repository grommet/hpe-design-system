import React from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

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

export const MaskedPhoneExample = () => (
  <Form>
    <FormField label="Phone" htmlFor="masked-phone" name="maskedPhone">
      <MaskedInput name="maskedPhone" id="masked-phone" mask={maskPhone} />
    </FormField>
  </Form>
);
