import React, { useState } from 'react';
import { Box, FormField, TextInput } from 'grommet';

export const TextInputSuggestionsExample = () => {
  const allSuggestions = ['Apples', 'Oranges', 'Bananas'];
  const [suggestions, setSuggestions] = useState(allSuggestions);
  const [value, setValue] = useState('');

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    let nextSuggestions;
    if (nextValue) {
      const regexp = new RegExp(nextValue, 'i');
      nextSuggestions = allSuggestions.filter(c => regexp.test(c));
    } else {
      nextSuggestions = allSuggestions;
    }
    setValue(nextValue);
    setSuggestions(nextSuggestions);
  };

  return (
    <Box direction="row-responsive" gap="large" align="end">
      <Box width="small">
        <FormField
          label="Static suggestions"
          help={`Type something to see suggestions persist 
          regardless of input value.`}
          htmlFor="text-input-static"
        >
          <TextInput
            id="text-input-static"
            placeholder="Placeholder text"
            suggestions={['Apples', 'Oranges', 'Bananas']}
          />
        </FormField>
      </Box>
      <Box width="small">
        <FormField
          label="Filtered suggestions"
          help={`Type something to see suggestions filter 
          based on the input value.`}
          htmlFor="text-input-filtered"
        >
          <TextInput
            id="text-input-filtered"
            placeholder="Placeholder text"
            onChange={onChange}
            onSelect={event => setValue(event.suggestion)}
            suggestions={suggestions}
            value={value}
          />
        </FormField>
      </Box>
    </Box>
  );
};
