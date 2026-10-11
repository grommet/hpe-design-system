// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputGoodLabeledPreview = () => (
  <Form>
    <FormField
      label="Email address"
      htmlFor="good-labeled-email"
      name="email"
    >
      <TextInput
        id="good-labeled-email"
        name="email"
        placeholder="e.g. jane@example.com"
        type="email"
      />
    </FormField>
  </Form>
);
