// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, FormField, TimeInput } from 'grommet';

export const TimeInputPlaygroundExample = () => {
  const [value, setValue] = React.useState('10:30');

  return (
    <Box width="medium">
      <FormField
        label="Start time"
        htmlFor="timeinput-playground"
        name="timeinput-playground"
      >
        <TimeInput
          id="timeinput-playground"
          name="timeinput-playground"
          value={value}
          onChange={event => setValue(event.value || '')}
          format="24"
          showSeconds={false}
          minuteStep={15}
        />
      </FormField>
    </Box>
  );
};
