import React, { useState } from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxGoodFormFieldUsagePreview = () => {
  const errorMsg = 'You must agree to continue.';
  const [message, setMessage] = useState(errorMsg);

  return (
    <Form>
      {/* CheckBox label provides the accessible name;
       htmlFor on FormField would create a duplicate
       label, causing an a11y violation. */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField name="terms" error={message}>
        <CheckBox
          name="terms"
          id="terms-good"
          label="I agree to the terms and conditions"
          onChange={event => {
            setMessage(event.target.checked ? '' : errorMsg);
          }}
        />
      </FormField>
    </Form>
  );
};
