import { Box, Text } from 'grommet';

import { useFilters } from '.';

export function ResultsSummary() {
  const { data, filteredResults, isFiltered, selected } = useFilters();
  const textSize = 'small';

  return selected.length ? (
    <Box direction="row" gap="xxsmall">
      <Text size={textSize} weight="bold">
        {selected.length}
      </Text>
      <Text size={textSize}>of</Text>
      <Text size={textSize} weight="bold">
        {isFiltered ? filteredResults.length : data.length}
      </Text>
      <Text size={textSize}>items selected</Text>
    </Box>
  ) : (
    <Box direction="row" gap="xxsmall">
      <Text size={textSize} weight="bold">
        {isFiltered ? filteredResults.length : data.length}
      </Text>
      <Text size={textSize}>
        {isFiltered
          ? `result${filteredResults.length > 1 ? 's' : ''} of `
          : 'items'}
      </Text>
      {isFiltered && (
        <Box direction="row" gap="xxsmall">
          <Text size={textSize} weight="bold">
            {data.length}
          </Text>
          <Text size={textSize}>{`item${data.length > 1 ? 's' : ''}`}</Text>
        </Box>
      )}
    </Box>
  );
}
