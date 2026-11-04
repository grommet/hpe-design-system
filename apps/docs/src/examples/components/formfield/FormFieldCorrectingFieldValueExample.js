// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useId, useState } from 'react';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

const initialErrors = {
  contactEmail: 'Include an @ character in the email address.',
};

export const FormFieldCorrectingFieldValueExample = () => {
  const id = useId();
  const [value, setValue] = useState({
    contactEmail: 'operations.example.com',
  });
  const [submitted, setSubmitted] = useState();

  return (
    <Box gap="medium" width="medium">
      <Form
        errors={initialErrors}
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
          setSubmitted(undefined);
        }}
        onSubmit={({ value: nextValue }) => setSubmitted(nextValue)}
      >
        <FormField
          label="Contact email"
          name="contactEmail"
          htmlFor={id}
          help="Enter an address such as operations@example.com."
          validate={{
            regexp: /@/,
            message: initialErrors.contactEmail,
          }}
          validateOn="submit"
        >
          <TextInput id={id} name="contactEmail" />
        </FormField>
        <Button type="submit" label="Save contact" primary />
      </Form>
      {submitted && (
        <Text role="status">Submitted locally: {submitted.contactEmail}</Text>
      )}
    </Box>
  );
};
