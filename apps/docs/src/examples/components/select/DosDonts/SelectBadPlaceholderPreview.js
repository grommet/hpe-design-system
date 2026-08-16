import React, { useState } from 'react';
import { Select } from 'grommet';

const options = ['North America', 'EMEA', 'Asia Pacific'];

export const SelectBadPlaceholderPreview = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      options={options}
      value={value}
      onChange={({ option }) => setValue(option)}
    />
  );
};
