import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export function ButtonRow({ children, ...rest }) {
  return <Box
      direction="row-responsive"
      gap="medium"
      pad={{ vertical: 'medium' }}
      {...rest}
    >
      {React.Children.map(children, child => (
        <Box align="start">{child}</Box>
      ))}
    </Box>;
}

ButtonRow.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
