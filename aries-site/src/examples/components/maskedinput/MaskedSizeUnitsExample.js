import React, { useState } from 'react';
import { Form, FormField, MaskedInput } from 'grommet';

export const MaskedSizeUnitsExample = () => {
  const [value, setValue] = useState('');

  return (
    <Form>
      <FormField
        label="Size"
        htmlFor="masked-size-units"
        name="maskedSizeUnits"
      >
        <MaskedInput
          name="maskedSizeUnits"
          id="masked-size-units"
          mask={[
            {
              length: [1, 4],
              options: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024],
              regexp: /^\d{1,4}$/,
              placeholder: 'nnn',
            },
            { fixed: ' ' },
            {
              length: 2,
              options: ['MB', 'GB', 'TB'],
              regexp: /^[mgt]b$|^[MGT]B$|^[mMgGtT]$/,
              placeholder: 'gb',
            },
          ]}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
      </FormField>
    </Form>
  );
};
