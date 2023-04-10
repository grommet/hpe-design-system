import React, { useContext } from 'react';
import { Box, Button, Heading, Grid, ResponsiveContext } from 'grommet';
import { Card } from '../../templates';
import { tools } from './data';

const columns = {
  xsmall: ['auto'],
  small: ['auto'],
  medium: ['auto'],
  large: ['auto', 'auto'],
  xlarge: ['auto', 'auto'],
};

export const ToolsNavigationalCards = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        Tools
      </Heading>
      <Grid columns={columns[breakpoint]} gap="medium">
        {tools.map((tool, index) => (
          <Card
            key={index}
            title={tool.title}
            description={tool.description}
            actions={
              <Button
                label={tool.action.label}
                icon={tool.action.icon}
                href={tool.action.href}
                reverse
              />
            }
            align="start"
            direction="row"
            level={3}
          />
        ))}
      </Grid>
    </Box>
  );
};
