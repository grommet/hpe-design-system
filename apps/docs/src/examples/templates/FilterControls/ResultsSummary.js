// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Text } from 'grommet';

import { useFilters } from '.';

export const ResultsSummary = () => {
  const { data, filteredResults, isFiltered, selected } = useFilters();
  const textSize = 'small';

  return selected.length ? (
    <Text size={textSize}>
      {/* eslint-disable-next-line max-len */}
      {selected.length} of {isFiltered ? filteredResults.length : data.length}{' '}
      items selected
    </Text>
  ) : (
    <Text size={textSize}>
      {isFiltered ? filteredResults.length : data.length}{' '}
      {isFiltered
        ? `result${filteredResults.length > 1 ? 's' : ''} of `
        : 'items'}{' '}
      {isFiltered && (
        <Text size={textSize}>
          {data.length} {`item${data.length > 1 ? 's' : ''}`}
        </Text>
      )}
    </Text>
  );
};
