import React from 'react';
import { Select } from 'grommet';

export const SelectPreview = () => (
    <Select
      aria-label="preview"
      options={['First']}
      placeholder="Choices"
      disabled
    />
  );
