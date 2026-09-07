// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Form, FormField, TimeInput } from 'grommet';

export const TimeInputBadTimeFormatPreview = () => (
  <Box width="medium">
    <Form>
      <FormField
        label="Start time"
        htmlFor="bad-start-time"
        name="bad-start-time"
      >
        <TimeInput
          id="bad-start-time"
          name="bad-start-time"
          value="08:00"
          format="12"
          showSeconds={false}
        />
      </FormField>
      <FormField
        label="End time"
        htmlFor="bad-end-time"
        name="bad-end-time"
      >
        <TimeInput
          id="bad-end-time"
          name="bad-end-time"
          value="17:00"
          format="24"
          showSeconds={false}
        />
      </FormField>
    </Form>
  </Box>
);
