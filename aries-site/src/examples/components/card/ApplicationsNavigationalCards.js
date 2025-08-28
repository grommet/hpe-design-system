import React, { useContext } from 'react';
import { Anchor, Box, Button, Heading, Grid, ResponsiveContext } from 'grommet';
import { Card } from '../../templates';
import { applications } from './data';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto', 'auto'],
};

export const ApplicationsNavigationalCards = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        Applications
      </Heading>
      <Grid columns={columns[breakpoint]} gap="medium">
        {applications.map((application, index) => (
          <Card
            key={index}
            title={application.title}
            description={application.description}
            actions={
              <Box align="start" gap='xsmall'>
                <Button
                  label={application.actions.button.label}
                  href={application.actions.button.href}
                  secondary
                />
                <Anchor
                  label={application.actions.anchor.label}
                  href={application.actions.anchor.href}
                  size="small"
                />
              </Box>
            }
            alignActions="end"
            level={3}
          />
        ))}
      </Grid>
    </Box>
  );
};
