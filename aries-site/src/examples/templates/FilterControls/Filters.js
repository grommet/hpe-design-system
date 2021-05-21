import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Stack, Text } from 'grommet';
import { Filter } from 'grommet-icons';

import { useFilters } from '.';
import { FiltersLayer } from './FiltersLayer';

const FilterButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

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
      <Box direction="row" align="center" gap="xsmall">
        <Stack anchor="top-right">
          <Box pad={{ top: 'small', right: 'small' }}>
            <FilterButton
              icon={<Filter />}
              onClick={() => {
                setPreviousFilters(filters);
                setFiltersLayer(true);
              }}
            />
          </Box>
          {isFiltered && (
            <Box
              align="center"
              background="text"
              border={{ color: 'background-front', size: 'small' }}
              pad={{ horizontal: 'xsmall' }}
              round
              width={{ min: '24px' }}
            >
              <Text color="text-strong" size="small">
                {filterCount}
              </Text>
            </Box>
          )}
        </Stack>
        {isFiltered && (
          <Box pad={{ top: 'small' }}>
            <ClearFiltersButton
              label="Clear Filters"
              onClick={() => {
                const nextFilters = {};
                applyFilters(data, nextFilters);
                setIsFiltered(false);
                setSearchValue('');
              }}
            />
          </Box>
        )}
      </Box>
      {filtersLayer && <FiltersLayer />}
    </>
  );
};
