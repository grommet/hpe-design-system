import React from 'react';
import { Box, Menu } from 'grommet';
import { useInert } from '@shared/hooks';

export const MenuPreview = () => {
  const ref = useInert();

  return (
    <Box ref={ref} round="xsmall">
      <Menu label="Menu" width="medium" />
    </Box>
  );
};
