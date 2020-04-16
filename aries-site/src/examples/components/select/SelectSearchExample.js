import React, { useState } from 'react';
import { Box, FormField, Select } from 'grommet';

const defaultOptions = ['EMEA', 'Asia/Pacific', 'Americas', 'Polar Regions'];

// Escaping regular expression special characters: [ \ ^ $ . | ? * + ( )
const getEscapedText = text => text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

// Create the regular expression with escaped special characters.
const formatSearchExpression = text => {
  return new RegExp(getEscapedText(text), 'i');
};

export const SelectSearchExample = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [selected, setSelected] = useState('');

  const onSearch = text => {
    const exp = formatSearchExpression(text);
    setOptions(defaultOptions.filter(option => exp.test(option)));
  };

  return (
    <Box width="medium">
      <FormField
        htmlFor="select-with-search__input"
        name="select-with-search"
        label="Location"
        help="Type to filter the location options"
      >
        <Select
          id="select-with-search"
          name="select-with-search"
          placeholder="Select location"
          searchPlaceholder="Search locations"
          options={options}
          value={selected}
          onChange={({ option }) => setSelected(option)}
          onSearch={text => onSearch(text)}
        />
      </FormField>
    </Box>
  );
};
