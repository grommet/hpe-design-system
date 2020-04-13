import React from 'react';
import { RangeInput } from 'grommet';

export const RangeInputPreview = () => {
  return <RangeInput aria-label="preview" max={100} min={0} value={80} />;
};
