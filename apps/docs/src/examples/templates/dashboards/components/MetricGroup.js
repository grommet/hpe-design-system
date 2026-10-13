// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Children, useContext } from 'react';
import PropTypes from 'prop-types';
import { Grid, ResponsiveContext } from 'grommet';

const columnCount = {
  xsmall: 1,
  small: 1,
  medium: 2,
  large: 4,
  xlarge: 4,
};

// Equal-width metrics separated by hairline dividers. Side by side, the
// dividers are vertical and occupy their own grid column so every metric
// keeps the same width. When the group collapses to a single column, the
// divider turns horizontal so stacked metrics still read as separate items.
// Wrapped rows at intermediate widths are separated by the grid gap alone.
export const MetricGroup = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const items = Children.toArray(children);
  const count = Math.min(columnCount[size] || columnCount.large, items.length);

  const columns = Array(count).fill('flex');

  return (
    <Grid columns={columns} gap="medium" {...rest}>
      {items}
    </Grid>
  );
};

MetricGroup.propTypes = {
  children: PropTypes.node,
};
