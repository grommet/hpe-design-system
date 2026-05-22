import React, { useState } from 'react';
import { Form, FormField, Select } from 'grommet';

const options = [
  'Administration',
  'Engineering',
  'Finance',
  'Human Resources',
  'Legal',
  'Marketing',
  'Operations',
  'Sales',
];

export const SelectChoosingValueExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="select-department__input"
        name="select-department"
        label="Department"
      >
        <Select
          id="select-department"
          name="select-department"
          placeholder="Select department"
          options={options}
          value={selected}
          onChange={({ option }) => setSelected(option)}
        />
      </FormField>
    </Form>
  );
};
