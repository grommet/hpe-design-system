import React, { useState } from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputPasswordExample = () => {
  const [password, setPassword] = useState('123password');

  return (
    <Form>
      <FormField
        name="password-example"
        label="Password"
        htmlFor="password-example"
      >
        <TextInput
          id="password-example"
          name="password-example"
          placeholder="Placeholder text"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </FormField>
    </Form>
  );
};
