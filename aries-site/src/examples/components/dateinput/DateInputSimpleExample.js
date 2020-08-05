import React from 'react';
import { Box, DateInput } from 'grommet';

export const DateInputSimpleExample = () => {
  return (
    <Box align="center" pad="large">
      <DateInput name="Date" format="mm/dd/yyyy" />
    </Box>
  );
};
