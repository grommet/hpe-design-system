import React from 'react';
import { Button } from 'grommet';
import { Projects } from '@hpe-design/icons-grommet';

export const TipIconExample = () => (
  <Button
    tip={{ dropProps: { align: { left: 'right' } }, content: 'Projects' }}
    a11yTitle="projects"
    icon={<Projects />}
  />
);
