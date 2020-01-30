import React, { useState } from 'react';
import { Box, Select } from 'grommet';

import { UsageExample } from '../../../layouts';

const defaultOptions = ['EMEA', 'Asia/Pacific', 'Americas', 'Polar Regions'];
const placeholder = 'Location';

// Escaping regular expression special characters: [ \ ^ $ . | ? * + ( )
const getEscapedText = text => text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

// Create the regular expression with escaped special characters.
const formatSearchExpression = text => {
  return new RegExp(getEscapedText(text), 'i');
};

export const SelectExample = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [selected, setSelected] = useState('');

  const onSearch = text => {
    const exp = formatSearchExpression(text);
    setOptions(defaultOptions.filter(option => exp.test(option)));
  };

  return (
    <UsageExample
      pad={{
        horizontal: 'large',
        vertical: 'large',
        small: { horizontal: 'large', vertical: 'xlarge' },
      }}
    >
      <Box width="medium">
        <Select
          placeholder={placeholder}
          searchPlaceholder="Search locations"
          options={options}
          value={selected}
          onChange={({ option }) => setSelected(option)}
          onSearch={text => onSearch(text)}
        />
      </Box>
    </UsageExample>
  );
};
