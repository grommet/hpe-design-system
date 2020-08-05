import React from 'react';
import { Box, DateInput } from 'grommet';

export const DateInputSimpleExample = () => {
  return (
    <Box align="center" pad="large">
      <DateInput name="dateinput" id="dateinput" format="mm/dd/yyyy" />
    </Box>
  );
};
