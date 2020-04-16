import React, { useState } from 'react';
import { Box, Button, Form, FormField, Select } from 'grommet';

const options = [
  'Item One',
  'Item Two',
  'Item Three',
  'Item Four',
  'Item Five',
  'Item Six',
];

export const SelectValidationExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <Box width="medium">
      <Form messages={{ required: 'Required.' }}>
        <FormField
          htmlFor="validation-example__input"
          name="validation-example"
          label="Label for Required Select"
          required
        >
          <Select
            id="validation-example"
            name="validation-example"
            placeholder="Select item"
            options={options}
            value={selected}
            onChange={({ option }) => setSelected(option)}
          />
        </FormField>
        <Button label="Validate" type="submit" />
      </Form>
    </Box>
  );
};
