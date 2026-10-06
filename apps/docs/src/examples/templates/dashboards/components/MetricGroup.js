// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Children, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, ResponsiveContext } from 'grommet';

const columnCount = {
  xsmall: 1,
  small: 1,
  medium: 2,
  large: 4,
  xlarge: 4,
};

// Equal-width metrics separated by hairline vertical dividers. Dividers
// occupy their own grid column so every metric keeps the same width. When
// metrics wrap onto further rows, the grid gap alone separates the rows.
export const MetricGroup = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const items = Children.toArray(children);
  const count = Math.min(columnCount[size] || columnCount.large, items.length);
  const rowCount = Math.ceil(items.length / count);

  const columns = [];
  for (let column = 0; column < count; column += 1) {
    if (column > 0) columns.push('auto');
    columns.push('flex');
  }

  const rows = [];
  const areas = [];
  const cells = [];
  for (let row = 0; row < rowCount; row += 1) {
    rows.push('auto');
    const rowAreas = [];
    items.slice(row * count, (row + 1) * count).forEach((item, column) => {
      if (column > 0) {
        const area = `rule-${row}-${column}`;
        rowAreas.push(area);
        cells.push(
          <Box
            key={area}
            gridArea={area}
            border={{ side: 'left', color: 'border-weak' }}
          />,
        );
      }
      const area = `metric-${row}-${column}`;
      rowAreas.push(area);
      cells.push(
        <Box key={area} gridArea={area}>
          {item}
        </Box>,
      );
    });
    // Pad a short final row so every row names the same number of columns.
    while (rowAreas.length < columns.length) rowAreas.push('.');
    areas.push(rowAreas);
  }

  return (
    <Grid columns={columns} rows={rows} areas={areas} gap="medium" {...rest}>
      {cells}
    </Grid>
  );
};

MetricGroup.propTypes = {
  children: PropTypes.node,
};
