import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import { Filters, ResultsSummary, SearchFilter, useFilters } from '.';

export const FilterControls = ({
  data,
  filters,
  layerProps,
  primaryKey,
  searchFilter,
}) => {
  const {
    setData,
    setFilterAttributes,
    setLayerProps,
    setPrimaryKey,
    syncFilteredResults,
  } = useFilters();

  useEffect(() => {
    setData(data);
  }, [data, setData]);

  useEffect(() => {
    setFilterAttributes(filters);
  }, [filters, setFilterAttributes]);

  useEffect(() => {
    setLayerProps(layerProps);
  }, [layerProps, setLayerProps]);

  useEffect(() => {
    setPrimaryKey(primaryKey);
  }, [primaryKey, setPrimaryKey]);

  /* keep filteredResults up to date as parent data set may change */
  useEffect(() => {
    syncFilteredResults();
  }, [syncFilteredResults]);

  return (
    <Box gap="xsmall" flex={false}>
      <Box direction="row" align="start" gap="small">
        {searchFilter && (
          <SearchFilter placeholder={searchFilter.placeholder} />
        )}
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
  layerProps: PropTypes.shape({
    // object of Grommet Box props
    containerProps: PropTypes.object,
    // object of Grommet Box props
    contentProps: PropTypes.object,
    // Grommet Layer props
  }),
  primaryKey: PropTypes.string,
  searchFilter: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      placeholder: PropTypes.string,
    }),
  ]),
};
