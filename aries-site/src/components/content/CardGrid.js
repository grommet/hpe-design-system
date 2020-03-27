import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';

export const CardGrid = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={size !== 'small' ? 'medium' : '100%'}
      gap="medium"
      justify="center"
      fill
      {...rest}
    >
      {children}
    </Grid>
  );
};

CardGrid.propTypes = {
  children: PropTypes.node.isRequired,
};
