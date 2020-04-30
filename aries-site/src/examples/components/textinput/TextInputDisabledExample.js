import React from 'react';
import { FormField, TextInput } from 'grommet';

export const TextInputDisabledExample = () => (
      <FormField label="Label" htmlFor="disabled-input" disabled>
        <TextInput
          id="disabled-input"
          placeholder="Placeholder text"
          disabled
        />
      </FormField>
);
