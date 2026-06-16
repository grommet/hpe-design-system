import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';
import { useInert } from '@shared/hooks';

export const CheckBoxGroupPreview = () => {
  const ref = useInert();

  return (
    <Form>
      <FormField
        ref={ref}
        name="checkboxgroup-preview"
        fill="horizontal"
        htmlFor="preview-checkboxgroup"
        label="Label"
      >
        <CheckBoxGroup
          options={[
            { label: 'Option 1', tabIndex: -1 },
            { label: 'Option 2', tabIndex: -1 },
            { label: 'Option 3', tabIndex: -1 },
          ]}
          value={['Option 2']}
          name="checkboxgroup-preview"
          id="preview-checkboxgroup"
        />
      </FormField>
    </Form>
  );
};
