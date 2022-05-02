import React from 'react';
import { RadioButtonGroup } from 'grommet';

export function RadioButtonGroupPreview() {
  return <RadioButtonGroup
      name="radio"
      aria-label="preview"
      options={[
        { label: 'Choice 1', value: 'c1', tabIndex: -1 },
        { label: 'Choice 2', value: 'c2', tabIndex: -1 },
        { label: 'Choice 3', value: 'c3', tabIndex: -1 },
      ]}
    />;
}
