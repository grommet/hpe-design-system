import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxDescriptionExample = () => {
  const [checked, setChecked] = useState();

  return (
    <Form>
      <FormField
        name="checkbox-with-desc"
        help="Checkbox description"
      >
        <CheckBox
          name="checkbox-with-desc"
          id="checkbox-desc"
          label="Checkbox label"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
        />
      </FormField>
    </Form>
  );
};
