import React from 'react';
import { FormField, TextInput } from 'grommet';

export const TextInputExample = () => (
  <FormField label="Label" htmlFor="username">
    <TextInput id="username" placeholder="Placeholder text" type="email" />
  </FormField>
);
