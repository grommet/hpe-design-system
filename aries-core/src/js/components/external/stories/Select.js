import React, { useState } from 'react';
import { Box, Grommet, Select } from 'grommet';
import { aries } from '../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Select',
};

export const Simple = () => {
  const options = ['one', 'two'];
  const [value, setValue] = useState('');

  return (
    <Grommet theme={aries} full>
      <Box align="center" justify="start" pad="large" fill>
        <Select
          id="select"
          name="select"
          placeholder="Select"
          value={value}
          options={options}
          onChange={({ option }) => setValue(option)}
        />
      </Box>
    </Grommet>
  );
};
