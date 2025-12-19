import { useContext, useEffect, useState } from 'react';
import { Box, Button, ThemeContext } from 'grommet';
import { Filter } from '@hpe-design/icons-grommet';

import { useFilters } from '.';
import { FiltersLayer } from './FiltersLayer';

export const Filters = () => {
  const {
    applyFilters,
    data,
    isFiltered,
    setIsFiltered,
    filters,
    filtersLayer,
    setFiltersLayer,
    setPreviousFilters,
    setSearchValue,
  } = useFilters();
  const [filterCount, setFilterCount] = useState();
  const theme = useContext(ThemeContext);

  // Provide indication for the number of filters applied
  useEffect(() => {
    let count = 0;

    // wait to update count until user completes setting their desired filters
    if (!filtersLayer) {
      Object.entries(filters).forEach(filter => {
        // filter can either be an array or an object with a value property,
        // check both
        if (filter[1].length > 0 || (filter[1].value && filter[1].value.length))
          count += 1;
      });
      setFilterCount(count);
    }
  }, [filters, filtersLayer, setFilterCount]);

  return (
    <>
      <Box direction="row" align="center" gap="xsmall" flex={false}>
        <Button
          a11yTitle="Filter"
          kind="toolbar"
          badge={
            filterCount > 0
              ? {
                  background: theme.global.colors.text,
                  value: filterCount,
                }
              : null
          }
          icon={<Filter />}
          tip={
            isFiltered
              ? `Open filters, ${filterCount} filters applied`
              : 'Open filters'
          }
          onClick={() => {
            setPreviousFilters(filters);
            setFiltersLayer(true);
          }}
        />
        {isFiltered && (
          <Button
            label="Clear Filters"
            onClick={() => {
              const nextFilters = {};
              applyFilters(data, nextFilters);
              setIsFiltered(false);
              setSearchValue('');
            }}
          />
        )}
      </Box>
      {filtersLayer && <FiltersLayer />}
    </>
  );
};
