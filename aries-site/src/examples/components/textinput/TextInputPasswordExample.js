import React, { useState } from 'react';
import { FormField, TextInput } from 'grommet';

export const TextInputPasswordExample = () => {
  const [password, setPassword] = useState('123password');

  return (
    <FormField label="Password" htmlFor="password-example">
      <TextInput
        id="password-example"
        placeholder="Placeholder text"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
      />
    </FormField>
  );
};
