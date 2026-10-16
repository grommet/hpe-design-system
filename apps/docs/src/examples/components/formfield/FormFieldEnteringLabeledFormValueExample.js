// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useId, useState } from 'react';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

export const FormFieldEnteringLabeledFormValueExample = () => {
  const id = useId();
  const [value, setValue] = useState({
    projectName: 'Infrastructure monitoring',
  });
  const [submitted, setSubmitted] = useState();

  return (
    <Box gap="medium" width="medium">
      <Form
        value={value}
        onChange={nextValue => {
          setValue(nextValue);
          setSubmitted(undefined);
        }}
        onSubmit={({ value: nextValue }) => setSubmitted(nextValue)}
      >
        <FormField label="Project name" name="projectName" htmlFor={id}>
          <TextInput id={id} name="projectName" />
        </FormField>
        <Button type="submit" label="Save changes" primary />
      </Form>
      {submitted && (
        <Text role="status">
          Submitted locally: {submitted.projectName || '(empty value)'}
        </Text>
      )}
    </Box>
  );
};
