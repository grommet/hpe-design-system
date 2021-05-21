import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import { Filters, ResultsSummary, SearchFilter, useFilters } from '.';

export const FilterControls = ({ data, filters }) => {
  const { setData, setFilterAttributes, syncFilteredResults } = useFilters();

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  useEffect(() => {
    setFilterAttributes(filters);
  }, [filters, setFilterAttributes]);

  /* keep filteredResults up to date as parent data set may change */
  useEffect(() => {
    syncFilteredResults();
  }, [syncFilteredResults]);

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
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string,
      label: PropTypes.string,
      filterType: PropTypes.oneOf(['CheckBoxGroup', 'RangeSelector']),
      inputProps: PropTypes.object,
    }),
  ),
};
