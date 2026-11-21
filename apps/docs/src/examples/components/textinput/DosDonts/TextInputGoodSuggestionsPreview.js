// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import { Form, FormField, TextInput } from 'grommet';

const allFruits = ['Apples', 'Bananas', 'Blueberries', 'Grapes', 'Oranges'];

export const TextInputGoodSuggestionsPreview = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(allFruits);

  const onChange = event => {
    const next = event.target.value;
    setValue(next);
    if (next) {
      const regexp = new RegExp(next, 'i');
      setSuggestions(allFruits.filter(f => regexp.test(f)));
    } else {
      setSuggestions(allFruits);
    }
  };

  return (
    <Form>
      <FormField
        label="Favorite fruit"
        htmlFor="good-suggestions"
        name="fruit"
      >
        <TextInput
          id="good-suggestions"
          name="fruit"
          placeholder="Start typing…"
          value={value}
          onChange={onChange}
          suggestions={suggestions}
          onSuggestionSelect={({ suggestion }) => setValue(suggestion)}
        />
      </FormField>
    </Form>
  );
};
