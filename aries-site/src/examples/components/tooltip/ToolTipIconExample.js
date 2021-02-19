import React from 'react';
import { Box, Button, Tip } from 'grommet';
import { Projects } from 'grommet-icons';

export const ToolTipIconExample = () => {
  return (
    <Box align="center" justify="center" fill>
      <Tip content="Projects">
        <Button icon={<Projects />} />
      </Tip>
    </Box>
  );
};
