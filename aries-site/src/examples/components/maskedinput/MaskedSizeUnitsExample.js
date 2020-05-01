import React, { useState } from 'react';
import { FormField, MaskedInput } from 'grommet';

export const MaskedSizeUnitsExample = () => {
  const [value, setValue] = useState('');

  return (
    <FormField label="Size" htmlFor="masked-size-units">
      <MaskedInput
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
  );
};
