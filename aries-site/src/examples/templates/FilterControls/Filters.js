// Copyright 2021 - Hewlett Packard Enterprise Company

import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, Stack, Text } from 'grommet';
import { Filter } from 'grommet-icons';

import { FilterContext } from '.';
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
    setPreviousFilters,
    setSearchValue,
  } = useContext(FilterContext);
  const [showLayer, setShowLayer] = useState(false);
  const [numberFilters, setNumberFilters] = useState();

  // Provide indication for the number of filters applied
  useEffect(() => {
    let count = 0;

    if (!showLayer) {
      Object.entries(filters).forEach(filter => {
        if (filter[1].length > 0) count += 1;
      });
      setNumberFilters(count);
    }
  }, [filters, showLayer, setNumberFilters]);

  return (
    <>
      <Box direction="row" align="center" gap="xsmall">
        <Stack anchor="top-right">
          <Box pad={{ top: 'small', right: 'small' }}>
            <FilterButton
              icon={<Filter />}
              onClick={() => {
                setPreviousFilters(filters);
                setShowLayer(true);
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
                {numberFilters}
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
      {showLayer && (
        <FiltersLayer showLayer={showLayer} setShowLayer={setShowLayer} />
      )}
    </>
  );
};
