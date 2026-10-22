// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import { Box, Grid, Heading, ResponsiveContext } from 'grommet';
import { CostTrend } from './CostTrend';
import { NeedsAttention } from './NeedsAttention';
import { SlaPerformance } from './SlaPerformance';

// The cost trend chart is given twice the width of its peers, so this region
// is laid out per breakpoint rather than as a fluid grid.
const stacked = {
  columns: ['flex'],
  rows: ['auto', 'auto', 'auto'],
  areas: [['cost'], ['attention'], ['sla']],
};

const layout = {
  xsmall: stacked,
  small: stacked,
  medium: {
    columns: ['flex', 'flex'],
    rows: ['auto', 'auto'],
    areas: [
      ['cost', 'cost'],
      ['attention', 'sla'],
    ],
  },
  large: {
    columns: ['flex', 'flex', 'flex', 'flex'],
    rows: ['auto'],
    areas: [['cost', 'cost', 'attention', 'sla']],
  },
};
layout.xlarge = layout.large;

export const WeekAtAGlance = () => {
  const size = useContext(ResponsiveContext);
  const { areas, columns, rows } = layout[size] || layout.large;

  return (
    <Box as="section" gap="small">
      <Heading level={2} margin="none">
        This week at a glance
      </Heading>
      <Grid columns={columns} rows={rows} areas={areas} gap="small">
        <CostTrend gridArea="cost" />
        <NeedsAttention gridArea="attention" />
        <SlaPerformance gridArea="sla" />
      </Grid>
    </Box>
  );
};
