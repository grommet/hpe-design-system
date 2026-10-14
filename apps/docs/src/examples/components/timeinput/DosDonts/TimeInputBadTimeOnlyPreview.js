// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, DateTimeInput, FormField } from 'grommet';

export const TimeInputBadTimeOnlyPreview = () => (
  <Box width="medium">
    <FormField
      label="Date and time"
      htmlFor="bad-time-only"
      name="bad-time-only"
    >
      <DateTimeInput
        id="bad-time-only"
        name="bad-time-only"
        format="12"
        defaultValue="2026-10-14T08:15"
      />
    </FormField>
  </Box>
);
