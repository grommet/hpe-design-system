import React from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

const maskEmail = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: 'example',
  },
  { fixed: '@' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'my',
  },
  { fixed: '.' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'com',
  },
];

export const MaskedEmailExample = () => (
  <Form>
    <FormField label="Email" htmlFor="masked-email" name="maskedEmail">
      <MaskedInput name="maskedEmail" id="masked-email" mask={maskEmail} />
    </FormField>
  </Form>
);
