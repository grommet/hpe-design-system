import React from 'react';
import { DateInput } from 'grommet';

export const DateInputPreview = () => {
  return (
    <DateInput
      aria-label="preview"
      format="mm/dd/yyyy"
      tabIndex={-1}
    />
  );
};
