// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { FormField, TimeInput } from 'grommet';

export const TimeInputExample = () => {
  return (
    <FormField label="Start time" htmlFor="timeinput" name="timeinput">
      <TimeInput
        id="timeinput"
        name="timeinput"
        format="24"
        showSeconds={false} // to be removed once latest grommet is updated
      />
    </FormField>
  );
};
