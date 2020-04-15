import React, { useState } from 'react';
import { Box, Select } from 'grommet';

const options = ['Item One', 'Item Two', 'Item Three', 'Item Four'];

export const SelectExample = () => {
  const [selected, setSelected] = useState('');

  return (
    <Box width="medium">
      <Select
        aria-label="Select item"
        placeholder="Select item"
        options={options}
        value={selected}
        onChange={({ option }) => setSelected(option)}
      />
    </Box>
  );
};
