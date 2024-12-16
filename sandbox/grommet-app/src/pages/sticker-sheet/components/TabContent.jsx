import PropTypes from 'prop-types';
import { Box, Tab } from 'grommet';

export const TabContent = ({ children, title }) => {
  return (
    <Tab title={title}>
      <Box gap="medium" pad={{ vertical: 'small' }} align="start">
        {children}
      </Box>
    </Tab>
  );
};

TabContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
