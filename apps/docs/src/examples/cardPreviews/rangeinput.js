import React from 'react';
import { RangeInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const RangeInputPreview = () => {
  const ref = useInert();

  return (
    <RangeInput
      ref={ref}
      aria-label="preview"
      max={100}
      min={0}
      value={80}
    />
  );
};
