import { Box, Text } from 'grommet';

import { useFilters } from '.';

export const ResultsSummary = () => {
  const { data, filteredResults, isFiltered } = useFilters();

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
