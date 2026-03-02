import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxSimpleExample = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Form>
      <FormField
        name="checkbox-simple"
        fill
        htmlFor="simple-checkbox"
        label="Label"
      >
        <CheckBox
          name="checkbox-simple"
          label="Choice"
          id="simple-checkbox"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
        />
      </FormField>
    </Form>
  );
};
