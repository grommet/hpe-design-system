import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxToggleExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Form>
      <FormField name="checkbox-toggle" label="Label" htmlFor="checkbox-toggle">
        <CheckBox
          name="checkbox-toggle"
          id="checkbox-toggle"
          label="Choice"
          checked={checked}
          onChange={event => setChecked(event.target.checked)}
          toggle
        />
      </FormField>
    </Form>
  );
};
