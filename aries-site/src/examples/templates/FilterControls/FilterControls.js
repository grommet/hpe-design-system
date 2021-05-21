import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import { Filters, ResultsSummary, SearchFilter, useFilters } from '.';

export const FilterControls = ({ data }) => {
  const { setData } = useFilters();

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  return (
    <Box gap="xsmall">
      <Box direction="row" align="end" gap="small">
        <SearchFilter />
        <Filters />
      </Box>
      <ResultsSummary />
    </Box>
  );
};

FilterControls.propTypes = {
  data: PropTypes.array,
};
