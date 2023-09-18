import React, { useState } from 'react';
import { Form, FormField, Select } from 'grommet';

const defaultOptions = ['EMEA', 'Asia/Pacific', 'Americas', 'Polar Regions'];

// Escaping regular expression special characters: [ \ ^ $ . | ? * + ( )
const getEscapedText = text => text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

// Create the regular expression with escaped special characters.
const formatSearchExpression = text => new RegExp(getEscapedText(text), 'i');

export const SelectSearchExample = () => {
  const [options, setOptions] = useState(defaultOptions);
  const [selected, setSelected] = useState('');

  const onSearch = text => {
    const exp = formatSearchExpression(text);
    setOptions(defaultOptions.filter(option => exp.test(option)));
  };

  return (
    <Form>
      {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
      {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
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
          searchPlaceholder="Search"
          options={options}
          value={selected}
          onChange={({ option }) => setSelected(option)}
          onClose={() => setOptions(defaultOptions)}
          onSearch={text => onSearch(text)}
        />
      </FormField>
    </Form>
  );
};
