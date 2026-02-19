import React, { useState } from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

const maskSize = [
  {
    length: [1, 4],
    options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
    regexp: /^\d{1,4}$/,
    placeholder: '128',
  },
  { fixed: ' ' },
  {
    length: 2,
    options: ['MB', 'GB', 'TB'],
    regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
    placeholder: 'GB',
  },
];

export const MaskedSizeUnitsExample = () => {
  const [value, setValue] = useState('');

  return (
    <Form>
      <FormField
        label="Storage size"
        htmlFor="masked-size-units"
        name="maskedSizeUnits"
      >
        <MaskedInput
          name="maskedSizeUnits"
          id="masked-size-units"
          mask={maskSize}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </FormField>
    </Form>
  );
};
