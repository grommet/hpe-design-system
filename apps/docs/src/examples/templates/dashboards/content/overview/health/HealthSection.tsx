// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import { Box, Heading } from 'grommet';
import { MetricGroup } from '../../../components/MetricGroup';
import { MetricTile } from '../../../components/MetricTile';
import { surfaceBackground } from '../data';

export const HealthSection = ({
  children,
  ...rest
}: ComponentProps<typeof Box>) => (
  <Box as="section" gap="small" {...rest}>
    <Heading level={2} margin="none">
      Health overview
    </Heading>
    <MetricGroup>{children}</MetricGroup>
  </Box>
);

// Tile with the section's surface applied, so tiles only describe content.
export const HealthTile = (props: ComponentProps<typeof MetricTile>) => (
  <MetricTile background={surfaceBackground} {...props} />
);
