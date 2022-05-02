import React, { useState } from 'react';
import { Form, FormField, TextArea } from 'grommet';

export function TextAreaValidationExample() {
  const [value, setValue] = useState('');
  const defaultErrorMessage = 'Type something to resolve this error.';
  const [message, setMessage] = useState(defaultErrorMessage);

  return (
    <Form>
      <FormField
        name="required-field"
        label="Label"
        htmlFor="required-field"
        error={message}
        required
      >
        <TextArea
          name="required-field"
          id="required-field"
          placeholder="Placeholder text"
          onChange={event => {
            if (event.target.value.length > 0) {
              setMessage('');
            } else {
              setMessage(defaultErrorMessage);
            }
            setValue(event.target.value);
          }}
          value={value}
        />
      </FormField>
    </Form>
  );
}
