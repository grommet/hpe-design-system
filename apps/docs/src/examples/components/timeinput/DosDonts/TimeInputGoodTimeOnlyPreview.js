// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, FormField, TimeInput } from 'grommet';

export const TimeInputGoodTimeOnlyPreview = () => (
  <Box width="medium">
    <FormField
      label="Delivery time"
      htmlFor="good-time-only"
      name="good-time-only"
    >
      <TimeInput
        id="good-time-only"
        name="good-time-only"
        format="12"
        showSeconds={false} // remove after update to latest Grommet version
        minuteStep={15}
      />
    </FormField>
  </Box>
);
