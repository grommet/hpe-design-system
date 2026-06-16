import React from 'react';
import { MaskedInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const MaskedInputPreview = () => {
  const ref = useInert();

  return (
    <MaskedInput
      ref={ref}
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
    />
  );
};
