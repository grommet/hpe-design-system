import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, ThemeContext } from 'grommet';
import { Filter } from 'grommet-icons';

import { useFilters } from '.';
import { FiltersLayer } from './FiltersLayer';

const ClearFiltersButton = styled(Button)`
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: inherit;
  font-weight: 500;
  text-decoration: underline;
  display: flex;
  border-radius: 0;
  &:hover {
    background: transparent;
  }
`;

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
  console.log(theme.global.colors.border.dark);

  // Provide indication for the number of filters applied
  useEffect(() => {
    let count = 0;

    // wait to update count until user completes setting their desired filters
    if (!filtersLayer) {
      Object.entries(filters).forEach(filter => {
        // filter can either be an array or an object with a value property,
        // check both
        if (filter[1].length > 0 || filter[1].value.length) count += 1;
      });
      setFilterCount(count);
    }
  }, [filters, filtersLayer, setFilterCount]);

  return (
    <>
      <Box direction="row" align="center" gap="small">
        <Button
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
          tip={`open filters, ${filterCount} currently applied`}
          onClick={() => {
            setPreviousFilters(filters);
            setFiltersLayer(true);
          }}
        />
        {isFiltered && (
          <ClearFiltersButton
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
