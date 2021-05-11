// Copyright 2021 - Hewlett Packard Enterprise Company

import { useContext } from 'react';
import { Box, Text } from 'grommet';

import { FilterContext } from '.';

export const ResultsSummary = () => {
  const { data, filteredResults, isFiltered } = useContext(FilterContext);

  return (
    <Box direction="row" gap="xxsmall">
      <Text size="small" weight="bold">
        {isFiltered ? filteredResults.length : data.length}
      </Text>
      <Text size="small">
        {isFiltered
          ? `result${filteredResults.length > 1 ? 's' : ''} of `
          : 'items'}
      </Text>
      {isFiltered && (
        <Box direction="row" gap="xxsmall">
          <Text size="small" weight="bold">
            {data.length}
          </Text>
          <Text size="small">{`item${data.length > 1 ? 's' : ''}`}</Text>
        </Box>
      )}
    </Box>
  );
};
