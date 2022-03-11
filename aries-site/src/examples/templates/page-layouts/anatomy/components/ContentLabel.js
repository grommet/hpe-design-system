import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const ContentLabel = ({ children }) => (
  <Box align="center" justify="center" fill>
    <Text color="text-strong">{children}</Text>
  </Box>
);

ContentLabel.propTypes = {
  children: PropTypes.node,
};
