import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export function CheckBoxDescriptionExample() {
  const [checked, setChecked] = useState();

  return (
    <Form>
      <FormField
        name="checkbox-with-desc"
        htmlFor="checkbox-desc"
        label="Checkbox Heading"
        help="Checkbox Description"
      >
        <CheckBox
          name="checkbox-with-desc"
          id="checkbox-desc"
          label="Checkbox Label"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
        />
      </FormField>
    </Form>
  );
}
