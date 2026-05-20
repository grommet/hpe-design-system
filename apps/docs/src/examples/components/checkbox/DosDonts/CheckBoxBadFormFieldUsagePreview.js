import React from 'react';
import { CheckBox, Form, FormField } from 'grommet';

export const CheckBoxBadFormFieldUsagePreview = () => (
  <Form>
    {/* Anti-pattern: FormField label AND CheckBox label
     create two associated <label> elements for one
     input — causes accessibility violations. */}
    {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
    <FormField
      name="terms"
      label="I agree to the terms and conditions"
    >
      <CheckBox
        name="terms"
        id="terms-bad"
        label="I agree to the terms and conditions"
      />
    </FormField>
  </Form>
);
