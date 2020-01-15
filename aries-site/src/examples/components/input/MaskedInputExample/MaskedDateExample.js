import React, { useState } from 'react';
import { Box, FormField } from 'grommet';
import { MaskedInput } from 'aries-core';

const today = new Date();
const daysInMonth = month => new Date(today.getFullYear(), month, 0).getDate();

export const MaskedDateExample = () => {
  const [date, setDate] = useState('');

  const maskDate = [
    {
      placeholder: 'mm',
      length: [1, 2],
      options: Array.from({ length: 12 }, (acc, val) => val + 1),
      regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    },
    { fixed: '/' },
    {
      placeholder: 'dd',
      length: [1, 2],
      options: Array.from(
        {
          length: daysInMonth(parseInt(date.split('/')[0], 10)),
        },
        (acc, val) => val + 1,
      ),
      regexp: /^[1-2][0-9]$|^3[0-1]$|^0?[1-9]$|^0$/,
    },
    { fixed: '/' },
    {
      placeholder: 'yyyy',
      length: 4,
      options: Array.from(
        { length: 25 },
        (acc, val) => today.getFullYear() - val,
      ),
      regexp: /^[1-2]$|^19$|^20$|^19[0-9]$|^20[0-9]$|^19[0-9][0-9]$|^20[0-9][0-9]$/,
    },
  ];

  return (
    <FormField label="Date" htmlFor="masked-date">
      <MaskedInput
        id="masked-date"
        mask={maskDate}
        value={date}
        onChange={event => setDate(event.target.value)}
      />
    </FormField>
  );
};
