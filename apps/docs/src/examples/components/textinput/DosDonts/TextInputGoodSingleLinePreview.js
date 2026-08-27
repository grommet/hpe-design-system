// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputGoodSingleLinePreview = () => (
  <Form>
    <FormField label="Full name" htmlFor="good-single-line" name="fullName">
      <TextInput
        id="good-single-line"
        name="fullName"
        placeholder="e.g. Jane Smith"
      />
    </FormField>
  </Form>
);
