import React from 'react';
import { Box, DateInput } from 'grommet';

export function DateInputPreview() {
  return <Box>
    <DateInput aria-label="preview" format="mm/dd/yyyy" tabIndex={-1} />
  </Box>;
}
