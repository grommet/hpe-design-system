import React from 'react';
import { RadioButtonGroup } from 'grommet';

export const RadioButtonGroupPreview = () => {
  return (
    <RadioButtonGroup
      name="radio"
      aria-label="preview"
      options={[
        { label: 'Choice 1', value: 'c1' },
        { label: 'Choice 2', value: 'c2' },
        { label: 'Choice 3', value: 'c3' },
      ]}
    />
  );
};
