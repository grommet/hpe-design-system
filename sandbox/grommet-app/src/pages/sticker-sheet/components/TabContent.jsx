import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const TabContent = ({ children }) => {
  return (
    <Box gap="medium" pad={{ vertical: 'small' }} align="start">
      {children}
    </Box>
  );
};

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
};
