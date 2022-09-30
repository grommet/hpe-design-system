import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid } from 'grommet';
import { Card } from '../../templates';
import { activities } from './data';

export const CardSpacingBestPractice = ({ bestPractice = true }) => (
  <Grid gap={!bestPractice ? 'small' : 'medium'} columns="medium">
    {activities.map((activity, index) => (
      <Card
        key={index}
        icon={activity.icon}
        title={activity.title}
        description={activity.description}
        actions={
          <Button
            label={activity.action.label}
            href={activity.action.href}
            secondary
          />
        }
        level={3}
      />
    ))}
  </Grid>
);

CardSpacingBestPractice.propTypes = {
  bestPractice: PropTypes.bool,
};
