import React, { useState } from 'react';
import { FormField, MaskedInput } from 'grommet';

const IPv4ElementExp = /^[0-1][0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$|^[0-9][0-9]$|^[0-9]$/;

export const MaskedIPRangeExample = () => {
  const [value, setValue] = useState('');

  return (
    <FormField label="IP Range" htmlFor="masked-ip-range">
      <MaskedInput
        id="masked-ip-range"
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
        ]}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    </FormField>
  );
};
