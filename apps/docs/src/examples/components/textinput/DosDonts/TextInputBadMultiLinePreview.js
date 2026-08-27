// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputBadMultiLinePreview = () => (
  <Form>
    <FormField
      label="Description"
      htmlFor="bad-multi-line"
      name="description"
    >
      {/* Don't use TextInput for content that needs multiple lines — use
          TextArea */}
      <TextInput
        id="bad-multi-line"
        name="description"
         placeholder={
           'Enter a detailed description including ' +
           'steps to reproduce...'
         }
      />
    </FormField>
  </Form>
);
