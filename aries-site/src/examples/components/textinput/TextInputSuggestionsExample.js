import React, { useState } from 'react';
import { Box, Form, FormField, TextInput } from 'grommet';

export function TextInputSuggestionsExample() {
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
      <Form>
        <FormField
          label="Static suggestions"
          name="static-suggestions-example"
          help={`Type something to see suggestions persist 
          regardless of input value.`}
          htmlFor="text-input-static"
        >
          <TextInput
            name="static-suggestions-example"
            id="text-input-static"
            placeholder="Placeholder text"
            suggestions={['Apples', 'Oranges', 'Bananas']}
          />
        </FormField>
      </Form>
      <Form>
        <FormField
          name="filtered-example"
          label="Filtered suggestions"
          help={`Type something to see suggestions filter 
          based on the input value.`}
          htmlFor="text-input-filtered"
        >
          <TextInput
            name="filtered-example"
            id="text-input-filtered"
            placeholder="Placeholder text"
            onChange={onChange}
            onSelect={event => setValue(event.suggestion)}
            suggestions={suggestions}
            value={value}
          />
        </FormField>
      </Form>
    </Box>
  );
}
