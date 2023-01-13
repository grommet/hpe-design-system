import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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

export const ActivitiesNavigationalCards = ({ heading = true, skeleton }) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      {heading && (
        <Heading level={2} size="small" margin="none">
          Activities and tasks
        </Heading>
      )}
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
            skeleton={skeleton}
          />
        ))}
      </Grid>
    </Box>
  );
};

ActivitiesNavigationalCards.propTypes = {
  heading: PropTypes.bool,
};
