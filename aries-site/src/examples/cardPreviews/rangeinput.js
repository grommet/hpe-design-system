import React from 'react';
import { RangeInput } from 'grommet';

export const RangeInputPreview = () => {
  return (
        <RangeInput
          max={100}
          min={0}
          value={80}
        />
  );
};
