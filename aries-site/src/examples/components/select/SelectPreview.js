import React from 'react';
import { Select } from 'grommet';

export function SelectPreview() {
  return <Select
      aria-label="preview"
      options={['First']}
      placeholder="Choices"
      disabled
    />;
}
