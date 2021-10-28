import React from 'react';
import { CheckBox, FormField } from 'grommet';

export const CheckBoxPreview = () => (
    <FormField fill="horizontal" tabIndex={-1}>
      <CheckBox aria-label="preview" checked label="Value" tabIndex={-1} />
    </FormField>
  );
