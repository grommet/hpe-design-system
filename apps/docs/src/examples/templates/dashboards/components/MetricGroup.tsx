// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Children, useContext } from 'react';
import type { ComponentProps } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

const columnCount = {
  xsmall: 1,
  small: 1,
  medium: 2,
  large: 4,
  xlarge: 4,
};

type MetricGroupProps = Omit<ComponentProps<typeof Grid>, 'columns'> & {
  columns?: never;
};

// Equal-width metrics separated by hairline dividers. Side by side, the
// dividers are vertical and occupy their own grid column so every metric
// keeps the same width. When the group collapses to a single column, the
// divider turns horizontal so stacked metrics still read as separate items.
// Wrapped rows at intermediate widths are separated by the grid gap alone.
export const MetricGroup = ({
  children,
  ...rest
}: MetricGroupProps) => {
  const size = useContext(ResponsiveContext);
  const items = Children.toArray(children);
  const countForSize =
    columnCount[size as keyof typeof columnCount] || columnCount.large;
  const count = Math.min(countForSize, items.length);

  const columns = Array(count).fill('flex');

  return (
    <Grid gap="small" {...rest} columns={columns}>
      {items}
    </Grid>
  );
};
