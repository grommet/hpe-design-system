import React from 'react';
import { Box, DateInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const DateInputPreview = () => {
  const ref = useInert();

  return (
    <Box ref={ref}>
      <DateInput aria-label="preview" format="mm/dd/yyyy" />
    </Box>
  );
};
