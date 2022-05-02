import React from 'react';
import { MaskedInput } from 'grommet';

export function MaskedInputPreview() {
  return <MaskedInput
      aria-label="preview"
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
      tabIndex={-1}
    />;
}
