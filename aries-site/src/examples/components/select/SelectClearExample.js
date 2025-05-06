import React, { useState } from 'react';
import { Box, Form, FormField, Select } from 'grommet';

const options = [
  'Item One',
  'Item Two',
  'Item Three',
  'Item Four',
  'Item Five',
  'Item Six',
];

export const SelectClearExample = () => {
  const [selected, setSelected] = useState('Item Four');

  return (
    <Box width="medium">
      <Form>
        {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField
          htmlFor="clear-example__input"
          name="clear-example"
          label="Label"
        >
          <Select
            id="clear-example"
            name="clear-example"
            placeholder="Select item"
            options={options}
            value={selected}
            onChange={({ option }) => setSelected(option)}
            clear={{ label: 'Clear selection' }}
          />
        </FormField>
      </Form>
    </Box>
  );
};
