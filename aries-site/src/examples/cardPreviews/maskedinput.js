import React from 'react';
import { MaskedInput } from 'grommet';

export const MaskedInputPreview = () => {
  return (
    <MaskedInput
      mask={[
        {
          placeholder: 'hh',
        },
        { fixed: ':' },
        {
          placeholder: 'mm',
        },
        { fixed: ' ' },
        {
          placeholder: 'ap',
        },
      ]}
    />
  );
};
