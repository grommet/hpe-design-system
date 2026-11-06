// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Children, useContext } from 'react';
import type { ComponentProps } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

export type MetricGroupProps = Omit<ComponentProps<typeof Grid>, 'columns'> & {
  columns?: never;
};

const columnCount: Record<string, number> = {
  xsmall: 1,
  small: 1,
  medium: 2,
  large: 4,
  xlarge: 4,
};

// Equal-width metrics arranged in responsive columns. The grid gap separates
// wrapped rows as well as neighboring metrics.
export const MetricGroup = ({ children, ...rest }: MetricGroupProps) => {
  const size = useContext(ResponsiveContext);
  const items = Children.toArray(children);
  const countForSize = columnCount[size] ?? columnCount.large;
  const count = Math.min(countForSize, items.length);

  const columns = Array<string>(count).fill('flex');

  return (
    <Grid gap="small" {...rest} columns={columns}>
      {items}
    </Grid>
  );
};
