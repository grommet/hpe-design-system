// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Form, FormField, TextInput } from 'grommet';

export const TextInputBadPatternPreview = () => (
  <Form>
    <FormField
      label="Phone number"
      htmlFor="bad-pattern-phone"
      name="phone"
    >
      {/* Don't use plain TextInput for pattern-constrained values — use
          MaskedInput */}
      <TextInput
        id="bad-pattern-phone"
        name="phone"
        placeholder="(xxx) xxx-xxxx"
      />
    </FormField>
  </Form>
);
