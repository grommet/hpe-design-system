import React from 'react';
import { Button, Tip } from 'grommet';
import { Projects } from 'grommet-icons';

export const ToolTipIconExample = () => {
  return (
    <Tip dropProps={{ align: { left: 'right' } }} content="Projects">
      <Button a11yTitle="projects" icon={<Projects />} />
    </Tip>
  );
};
