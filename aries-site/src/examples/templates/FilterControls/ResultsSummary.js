import { Box, Text } from 'grommet';

import { useFilters } from '.';

export const ResultsSummary = () => {
  const { data, filteredResults, isFiltered, selected } = useFilters();
  const textSize = 'medium';

  return selected.length ? (
    <Box direction="row" gap="xxsmall">
      <Text size={textSize}>{selected.length}</Text>
      <Text size={textSize}>of</Text>
      <Text size={textSize}>
        {isFiltered ? filteredResults.length : data.length}
      </Text>
      <Text size={textSize}>items selected</Text>
    </Box>
  ) : (
    <Box direction="row" gap="xxsmall">
      <Text size={textSize}>
        {isFiltered ? filteredResults.length : data.length}
      </Text>
      <Text size={textSize}>
        {isFiltered
          ? `result${filteredResults.length > 1 ? 's' : ''} of `
          : 'items'}
      </Text>
      {isFiltered && (
        <Box direction="row" gap="xxsmall">
          <Text size={textSize}>{data.length}</Text>
          <Text size={textSize}>{`item${data.length > 1 ? 's' : ''}`}</Text>
        </Box>
      )}
    </Box>
  );
};
