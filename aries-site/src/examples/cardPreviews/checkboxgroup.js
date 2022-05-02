import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

export function CheckBoxGroupPreview() {
  return <Form>
      <FormField
        name="checkboxgroup-preview"
        fill="horizontal"
        htmlFor="preview-checkboxgroup"
        label="Label"
        tabIndex={-1}
      >
        <CheckBoxGroup
          options={[
            { label: 'Option 1', tabIndex: -1 },
            { label: 'Option 2', tabIndex: -1 },
            { label: 'Option 3', tabIndex: -1 },
          ]}
          value={['Option 2']}
          name="checkboxgroup-preview"
          id="simple-checkboxgroup"
        />
      </FormField>
    </Form>;
}
