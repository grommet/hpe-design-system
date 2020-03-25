import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'grommet';

export const CardGrid = ({ children, ...rest }) => {
  return (
    <Grid columns="medium" gap="medium" justify="center" fill {...rest}>
      {children}
    </Grid>
  );
};

CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
};
