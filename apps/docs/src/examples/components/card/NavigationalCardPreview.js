import React from 'react';
import { Button } from 'grommet';
import { activities } from './data';
import { Card } from '../../templates';

export const NavigationalCardPreview = () => {
  const { title, description, icon, action } = activities[0];
  return (
    <Card
      title={title}
      description={description}
      icon={icon}
      actions={<Button label={action.label} secondary />}
      width="medium"
    />
  );
};
