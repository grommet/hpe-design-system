import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxSimpleExample = () => {
  const [checked, setChecked] = useState(true);
  return (
    <Form>
      {/* CheckBox label provides the accessible name; htmlFor on FormField
       would create a duplicate label, causing an a11y violation. */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField name="checkbox-simple" fill>
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
