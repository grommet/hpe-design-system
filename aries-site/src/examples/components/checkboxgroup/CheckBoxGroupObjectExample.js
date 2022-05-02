import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

const objectOptions = [];
for (let i = 1; i <= 3; i += 1) {
  objectOptions.push({
    label: `Option ${i}`,
    val: i,
  });
}

export function CheckBoxGroupObjectExample() {
  return <Form>
      <FormField
        name="checkboxgroup-objectoptions"
        fill
        htmlFor="objectoptions-checkboxgroup"
        label="Label"
      >
        <CheckBoxGroup
          options={objectOptions}
          name="checkboxgroup-objectoptions"
          id="objectoptions-checkboxgroup"
          valueKey="val"
        />
      </FormField>
    </Form>;
}
