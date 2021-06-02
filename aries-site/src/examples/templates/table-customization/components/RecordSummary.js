import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const RecordSummary = ({ filteredData, data, filtering }) => (
  <Box direction="row" gap="xxsmall">
    <Text size="small" weight="bold">
      {filteredData.length}
    </Text>
    <Text size="small">
      {filtering ? `result${filteredData.length > 1 ? 's' : ''} of ` : 'items'}
    </Text>
    {filtering && (
      <Box direction="row" gap="xxsmall">
        <Text size="small" weight="bold">
          {data.length}
        </Text>
        <Text size="small">{`item${data.length > 1 ? 's' : ''}`}</Text>
      </Box>
    )}
  </Box>
);

RecordSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string,
      status: PropTypes.string,
    }),
  ).isRequired,
  filtering: PropTypes.bool.isRequired,
};