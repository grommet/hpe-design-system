import React from 'react';
import { Box, Menu } from 'grommet';

export function MenuPreview() {
  return <Box round="xsmall">
      <Menu label="Menu" width="medium" tabIndex={-1} />
    </Box>;
}
