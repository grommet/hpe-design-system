import { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

import { Filters, ResultsSummary, SearchFilter, useFilters } from '.';

export function FilterControls({
  actions,
  data,
  filters,
  layerProps,
  primaryKey,
  searchFilter,
}) {
  const {
    setData,
    setFilterAttributes,
    setLayerProps,
    setPrimaryKey,
    syncFilteredResults,
  } = useFilters();
  const size = useContext(ResponsiveContext);

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
    <Box flex={false} fill="horizontal">
      <Box
        direction="row"
        align="start"
        justify="between"
        gap="small"
        // so search input has room to grow on mobile
        wrap={['xsmall', 'small'].includes(size)}
      >
        <Box
          direction="row"
          align="end"
          gap="small"
          margin={{ bottom: 'xsmall' }}
        >
          {searchFilter && (
            <SearchFilter placeholder={searchFilter.placeholder} />
          )}
          <Filters />
        </Box>
        {actions}
      </Box>
      <ResultsSummary />
    </Box>
  );
}

FilterControls.propTypes = {
  actions: PropTypes.element,
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
