// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useId, useState } from 'react';
import { Box, Button, Form, FormField, Text, TextInput } from 'grommet';

export const FormFieldValidatingNamedFormFieldExample = () => {
  const id = useId();
  const [value, setValue] = useState({ projectCode: 'OPS12' });
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
        <FormField
          label="Project code"
          name="projectCode"
          htmlFor={id}
          help="Use three uppercase letters followed by three digits."
          validate={{
            regexp: /^[A-Z]{3}[0-9]{3}$/,
            message: 'Enter three uppercase letters followed by three digits.',
          }}
          validateOn="submit"
        >
          <TextInput id={id} name="projectCode" />
        </FormField>
        <Box margin={{ top: 'medium' }} responsive={false} align="start">
          <Button type="submit" label="Create project" primary />
        </Box>
      </Form>
      {submitted && (
        <Text role="status">Submitted locally: {submitted.projectCode}</Text>
      )}
    </Box>
  );
};
