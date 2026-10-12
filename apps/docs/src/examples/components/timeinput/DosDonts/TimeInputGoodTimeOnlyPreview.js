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
        defaultValue="08:15:00" // remove seconds for latest Grommet version
        format="12"
        showSeconds={false} // remove after update to latest Grommet version
        minuteStep={15}
      />
    </FormField>
  </Box>
);
