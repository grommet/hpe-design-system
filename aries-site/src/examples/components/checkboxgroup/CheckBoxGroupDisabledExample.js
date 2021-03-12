import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupDisabledExample = () => (
    <Form>
      <FormField
        name="disabled-checkbox"
        label="Label"
        htmlFor="disabled-checkbox"
        disabled
      >
        <CheckBoxGroup
          name="disabled-checkbox"
          id="disabled-checkbox"
          options={['Option 1', 'Option 2', 'Option 3']}
          disabled
        />
      </FormField>
    </Form>
  );
