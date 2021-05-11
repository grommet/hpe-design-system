// Copyright 2021 - Hewlett Packard Enterprise Company

import { Box } from 'grommet';

import { Filters, ResultsSummary, SearchFilter } from '.';

export const FilterControls = () => (
  <Box gap="xsmall">
    <Box direction="row" align="end" gap="small">
      <SearchFilter />
      <Filters />
    </Box>
    <ResultsSummary />
  </Box>
);
