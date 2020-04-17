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

export const SelectValidationExample = () => {
  const [selected, setSelected] = useState('');
  const [message, setMessage] = useState(
    'Select a value from the list to resolve this error.',
  );

  return (
    <Box width="medium">
      <Form>
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
    </Box>
  );
};
