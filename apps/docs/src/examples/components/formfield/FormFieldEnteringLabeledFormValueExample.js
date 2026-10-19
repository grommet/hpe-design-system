// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useId, useState } from 'react';
import { Box, Form, FormField, TextInput } from 'grommet';

export const FormFieldEnteringLabeledFormValueExample = () => {
  const id = useId();
  const [value, setValue] = useState({
    projectName: 'Infrastructure monitoring',
  });

  return (
    <Box width="medium">
      <Form value={value} onChange={nextValue => setValue(nextValue)}>
        <FormField label="Project name" name="projectName" htmlFor={id}>
          <TextInput id={id} name="projectName" />
        </FormField>
      </Form>
    </Box>
  );
};
