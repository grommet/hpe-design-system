import React from 'react';
import { Box, DateInput } from 'grommet';

export const DateInputPreview = () => (
  <Box>
    <DateInput aria-label="preview" format="mm/dd/yyyy" tabIndex={-1} />
  </Box>
);
