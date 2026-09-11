// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Form, FormField, TimeInput } from 'grommet';

export const TimeInputGoodTimeFormatPreview = () => (
  <Box width="medium">
    <Form>
      <FormField
        label="Start time"
        htmlFor="good-start-time"
        name="good-start-time"
      >
        <TimeInput
          id="good-start-time"
          name="good-start-time"
          value="08:00"
          format="12"
          showSeconds={false}
        />
      </FormField>
      <FormField
        label="End time"
        htmlFor="good-end-time"
        name="good-end-time"
      >
        <TimeInput
          id="good-end-time"
          name="good-end-time"
          value="05:00"
          format="12"
          showSeconds={false}
        />
      </FormField>
    </Form>
  </Box>
);
