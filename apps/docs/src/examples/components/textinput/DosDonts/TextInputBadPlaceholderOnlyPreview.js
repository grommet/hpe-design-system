// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Form, TextInput } from 'grommet';

export const TextInputBadPlaceholderOnlyPreview = () => (
  <Form>
    <Box pad={{ horizontal: 'xsmall' }}>
      {/* Don't rely on placeholder as the only label — it disappears on input
          and fails accessibility */}
      <TextInput
        id="bad-placeholder-only"
        name="email"
        placeholder="Email address"
        type="email"
      />
    </Box>
  </Form>
);
