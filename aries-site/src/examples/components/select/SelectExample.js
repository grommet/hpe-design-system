import React, { useState } from 'react';
import { FormField, Select } from 'grommet';

const options = [
  'Item One',
  'Item Two',
  'Item Three',
  'Item Four',
  'Item Five',
  'Item Six',
];

export const SelectExample = () => {
  const [selected, setSelected] = useState('');

  return (
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
  );
};
