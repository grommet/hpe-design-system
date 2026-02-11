import React, { useState } from 'react';
import { Box, CheckBox, Form, FormField, Select } from 'grommet';

const options = [
  'Item One',
  'Item Two',
  'Item Three',
  'Item Four',
  'Item Five',
  'Item Six',
];

export const SelectDisabledExample = () => {
  const [selected, setSelected] = useState('');
  const [disabled, setDisabled] = useState(true);

  return (
    <Box width="medium">
      <Form>
        {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField
          htmlFor="disabled-example__input"
          name="disabled-example"
          label="Label"
          /* Note: The `disabled` property should be set on both 
        the FormField as well as the Select component */
          disabled={disabled}
        >
          <Select
            id="disabled-example"
            name="disabled-example"
            placeholder="Select item"
            options={options}
            value={selected}
            onChange={({ option }) => setSelected(option)}
            /* Note: The `disabled` property should be set on both 
          the FormField as well as the Select component */
            disabled={disabled}
          />
        </FormField>
      </Form>
      <Form>
        <FormField
          htmlFor="disabledToggle"
          name="disabledToggle"
          help="Set the disabled state for the Select input above."
        >
          <CheckBox
            toggle
            id="disabledToggle"
            name="disabledToggle"
            label={disabled ? 'Disabled' : 'Enabled'}
            checked={!disabled}
            onChange={() => setDisabled(!disabled)}
            direction="row"
          />
        </FormField>
      </Form>
    </Box>
  );
};
