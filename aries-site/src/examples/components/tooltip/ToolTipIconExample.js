import React from 'react';
import { Button } from 'grommet';
import { Projects } from 'grommet-icons';

export const ToolTipIconExample = () => {
  return (
    <Button
      tip={{ dropProps: { align: { left: 'right' } }, content: 'Projects' }}
      a11yTitle="projects"
      icon={<Projects />}
    />
  );
};
