import { Box, Text } from 'grommet';
import PropTypes from 'prop-types';

export const Legend = ({ color, label }) => (
  <Box direction="row" align="center" gap="3xsmall">
    <Box
      flex={false}
      pad="3xsmall"
      round
      background={color}
      responsive={false}
    />
    <Text weight={500} size="small">
      {label}
    </Text>
  </Box>
);

Legend.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
};
