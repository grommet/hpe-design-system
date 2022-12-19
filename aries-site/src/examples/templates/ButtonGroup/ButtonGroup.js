import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ThemeContext } from 'grommet';

export const ButtonGroup = ({ children, ...rest }) => {
  const { buttonGroup } = useContext(ThemeContext);

  return (
    <Box direction="row" {...buttonGroup} {...rest}>
      {children}
    </Box>
  );
};

ButtonGroup.propTypes = {
  children: PropTypes.node,
};
