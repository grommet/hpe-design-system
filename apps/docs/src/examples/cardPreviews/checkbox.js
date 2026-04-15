import React from 'react';
import { CheckBox, FormField } from 'grommet';
import { useInert } from '@shared/hooks';

export const CheckBoxPreview = () => {
  const ref = useInert();

  return (
    <FormField
      ref={ref}
      name="checkbox-preview"
      htmlFor="checkbox-preview"
      fill="horizontal"
    >
      <CheckBox
        name="checkbox-preview"
        id="checkbox-preview"
        aria-label="preview"
        checked
        label="Value"
      />
    </FormField>
  );
};
