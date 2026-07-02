import React, { useState } from 'react';
import { Form, FormField, Select } from 'grommet';

const options = ['North America', 'EMEA', 'Asia Pacific'];

export const SelectGoodPlaceholderPreview = () => {
  const [value, setValue] = useState('');

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="good-placeholder-select__input"
        name="good-placeholder-select"
        label="Region"
      >
        <Select
          id="good-placeholder-select"
          name="good-placeholder-select"
          placeholder="Select a region"
          options={options}
          value={value}
          onChange={({ option }) => setValue(option)}
        />
      </FormField>
    </Form>
  );
};
