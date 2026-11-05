// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactNode } from 'react';
import { Box, Heading } from 'grommet';
import { AlignedMetricTile } from '../../../../components/helpers/Dashboard/AlignedMetricTile';
import { MetricGroup } from '../../../../components/helpers/Dashboard/MetricGroup';
import { surfaceBackground } from '../data';

export type HealthSectionProps = ComponentProps<typeof Box> & {
  summary?: ReactNode;
};
// Section chrome shared by every health overview variant. An optional
// summary sits at the end of the heading row for a row-level verdict.
export const HealthSection = ({
  children,
  summary,
  ...rest
}: HealthSectionProps) => {
  const heading = (
    <Heading level={2} margin="none">
      Health overview
    </Heading>
  );
  return (
    <Box as="section" gap="small" {...rest}>
      {summary ? (
        <Box direction="row" align="center" justify="between" gap="small" wrap>
          {heading}
          {summary}
        </Box>
      ) : (
        heading
      )}
      <MetricGroup>{children}</MetricGroup>
    </Box>
  );
};

export type HealthTileProps = ComponentProps<typeof AlignedMetricTile>;
// Tile with the section's surface applied, so variants only describe content.
export const HealthTile = (props: HealthTileProps) => (
  <AlignedMetricTile background={surfaceBackground} {...props} />
);
