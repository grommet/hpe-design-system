import React, { useState } from 'react';
import { Box, Form, FormField, Select } from 'grommet';

const options = ['Item One', 'Item Two', 'Item Three', 'Item Four'];

export const SelectMultipleExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <Box width="medium">
      <Form>
        <FormField
          htmlFor="multi-select-example__input"
          name="multi-select-example"
          label="Label for Multi-Select"
        >
          <Select
            id="multi-select-example"
            name="multi-select-example"
            placeholder="Select multiple items"
            options={options}
            value={selected}
            onChange={({ value: nextValue }) => setSelected(nextValue)}
            multiple
          />
        </FormField>
      </Form>
    </Box>
  );
};
