import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export function ContentLabel({ children }) {
  return <Box align="center" justify="center" fill>
    <Text color="text-strong">{children}</Text>
  </Box>;
}

ContentLabel.propTypes = {
  children: PropTypes.node,
};
