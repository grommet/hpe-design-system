import React from 'react';
import { CheckBoxGroup, Form, FormField } from 'grommet';

export const CheckBoxGroupSimpleExample = () => (
    <Form>
      <FormField
        name="checkbox-simple"
        fill
        htmlFor="simple-checkboxgroup"
        label="Label"
      >
        <CheckBoxGroup
          options={['Option 1', 'Option 2', 'Option 3']}
          name="checkbox-simple"
          id="simple-checkboxgroup"
        />
      </FormField>
    </Form>
  );
