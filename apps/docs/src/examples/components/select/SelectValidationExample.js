import React, { useState } from 'react';
import { Form, FormField, Select } from 'grommet';

const options = [
  'Item one',
  'Item two',
  'Item three',
  'Item four',
  'Item five',
  'Item six',
];

export const SelectValidationExample = () => {
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState(
    'Select a value from the list to resolve this error.',
  );

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="validation-example__input"
        name="validation-example"
        label="Label"
        error={message}
      >
        <Select
          id="validation-example"
          name="validation-example"
          placeholder="Select item"
          options={options}
          value={selected}
          onChange={({ option }) => {
            setSelected(option);
            if (option) {
              setMessage();
            }
          }}
        />
      </FormField>
    </Form>
  );
};
