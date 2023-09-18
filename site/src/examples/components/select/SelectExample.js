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

export const SelectExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="select-example__input"
        name="select-example"
        label="Label"
      >
        <Select
          id="select-example"
          name="select-example"
          placeholder="Select item"
          options={options}
          value={selected}
          onChange={({ option }) => setSelected(option)}
        />
      </FormField>
    </Form>
  );
};
