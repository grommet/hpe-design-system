import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const PaginationSummary = ({ page, step, numberItems, ...rest }) => (
  <Box flex="grow">
    <Text {...rest}>
      {`Showing ${(page - 1) * step + 1}-${Math.min(
        page * step,
        numberItems,
      )} of ${numberItems} items`}
    </Text>
  </Box>
);

PaginationSummary.propTypes = {
  page: PropTypes.number,
  step: PropTypes.number,
  numberItems: PropTypes.number,
};
