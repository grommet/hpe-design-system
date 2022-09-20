import React, { useContext } from 'react';
import { Box, Button, Heading, Grid, ResponsiveContext } from 'grommet';
import { Card } from '../../templates';
import { activities } from './data';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto'],
};

export const ActivitiesNavigationalCards = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      <Heading level={2} size="small" margin="none">
        Activities & Tasks
      </Heading>
      <Grid columns={columns[breakpoint]} gap="medium">
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
    </Box>
  );
};
