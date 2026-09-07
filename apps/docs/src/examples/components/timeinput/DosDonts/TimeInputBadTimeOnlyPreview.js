// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, DateInput, FormField } from 'grommet';

export const TimeInputBadTimeOnlyPreview = () => (
  <Box width="medium">
    <FormField
      label="Date and time"
      htmlFor="bad-time-only"
      name="bad-time-only"
    >
      <DateInput
        id="bad-time-only"
        name="bad-time-only"
        value="2026-09-07T08:15:00"
        format="mm/dd/yyyy"
      />
    </FormField>
  </Box>
);
