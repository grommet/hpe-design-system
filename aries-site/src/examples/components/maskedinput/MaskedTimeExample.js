import React, { useState } from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

const maskTime = [
  {
    placeholder: 'hh',
    length: [1, 2],
    options: Array.from({ length: 12 }, (key, val) => val + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
  },
  { fixed: ':' },
  {
    placeholder: 'mm',
    length: 2,
    options: ['00', '15', '30', '45'],
    regexp: /^[0-5][0-9]$|^[0-9]$/,
  },
  { fixed: ' ' },
  {
    placeholder: 'ap',
    length: 2,
    options: ['am', 'pm'],
    regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
  },
];

export const MaskedTimeExample = () => {
  const [time, setTime] = useState('');

  return (
    <Form>
      <FormField label="Time" htmlFor="masked-time" name="maskedTime">
        <MaskedInput
          name="maskedTime"
          id="masked-time"
          mask={maskTime}
          value={time}
          onChange={event => setTime(event.target.value)}
        />
      </FormField>
    </Form>
  );
};
