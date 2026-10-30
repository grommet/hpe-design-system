// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactNode } from 'react';
import { Box, Heading } from 'grommet';
import { AlignedMetricTile } from '../../../components/AlignedMetricTile';
import { MetricGroup } from '../../../components/MetricGroup';
import { surfaceBackground } from '../data';

type HealthSectionProps = ComponentProps<typeof Box> & {
  children?: ReactNode;
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

// Tile with the section's surface applied, so variants only describe content.
export const HealthTile = (props: ComponentProps<typeof AlignedMetricTile>) => (
  <AlignedMetricTile background={surfaceBackground} {...props} />
);
