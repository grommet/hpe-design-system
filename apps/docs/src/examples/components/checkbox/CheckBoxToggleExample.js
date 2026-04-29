import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxToggleExample = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Form>
      {/* CheckBox label provides the accessible name; htmlFor on FormField
       would create a duplicate label, causing an a11y violation. */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField name="checkbox-toggle">
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
