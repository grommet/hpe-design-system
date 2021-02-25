import React from 'react';
import { Box, Button, Tip } from 'grommet';
import { Projects } from 'grommet-icons';

export const ToolTipIconExample = () => {
  return (
    <Box align="center" justify="center" fill>
      <Tip dropProps={{ align: { left: 'right' } }} content="Projects">
        <Button a11yTitle="projects" icon={<Projects />} />
      </Tip>
    </Box>
  );
};
