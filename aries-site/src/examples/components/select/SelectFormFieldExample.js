import React, { useState } from 'react';
import { Box, FormField, Select } from 'grommet';

const options = ['Item One', 'Item Two', 'Item Three', 'Item Four'];

export const SelectFormFieldExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <Box width="medium">
      <FormField
        htmlFor="form-field-example__input"
        name="form-field-example"
        label="Label"
      >
        <Select
          id="form-field-example"
          name="form-field-example"
          placeholder="Select item"
          options={options}
          value={selected}
          onChange={({ option }) => setSelected(option)}
        />
      </FormField>
    </Box>
  );
};
