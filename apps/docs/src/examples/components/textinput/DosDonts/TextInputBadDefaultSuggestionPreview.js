// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputBadDefaultSuggestionPreview = () => (
  <Form>
    <FormField
      label="Favorite fruit"
      htmlFor="bad-default-suggestion"
      name="fruit"
    >
      {/* Don't use defaultSuggestion — it causes unexpected context changes
          for screen reader users */}
      <TextInput
        id="bad-default-suggestion"
        name="fruit"
        placeholder="Start typing…"
        suggestions={['Apples', 'Bananas', 'Blueberries', 'Grapes', 'Oranges']}
        defaultSuggestion={0}
      />
    </FormField>
  </Form>
);
