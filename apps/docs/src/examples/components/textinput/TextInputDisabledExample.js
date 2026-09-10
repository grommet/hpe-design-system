// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputDisabledExample = () => (
  <Form>
    <FormField
      name="disabled-example"
      label="Label"
      htmlFor="disabled-input"
      disabled
    >
      <TextInput
        name="disabled-example"
        id="disabled-input"
        placeholder="Placeholder text"
        disabled
      />
    </FormField>
  </Form>
);
