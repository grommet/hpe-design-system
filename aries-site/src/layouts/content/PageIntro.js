import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Grid, ResponsiveContext } from 'grommet';

export const PageIntro = ({ children, ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box height={{ min: 'medium' }} justify="center">
      <Grid
        gap={!['xsmall', 'small'].includes(size) ? 'large' : 'medium'}
        columns={{
          count: 'fit',
          size: !['xsmall', 'small'].includes(size) ? 'medium' : 'fill',
        }}
        {...rest}
      >
        {/* Empty card allows vertical space for background image to 
        show on mobile */}
        <Card background="none" elevation="none" height="small" />
        <Card background="none" elevation="none">
          {children}
        </Card>
      </Grid>
    </Box>
  );
};

PageIntro.propTypes = {
  children: PropTypes.node.isRequired,
};
