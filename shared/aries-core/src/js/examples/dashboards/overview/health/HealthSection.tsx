// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import { Box, Heading } from 'grommet';
import { MetricCard, MetricCards } from '../../../../patterns/cards';
import { surfaceBackground } from '../data';

export const HealthSection = ({
  children,
  ...rest
}: ComponentProps<typeof Box>) => (
  <Box as="section" gap="small" {...rest}>
    <Heading level={2} margin="none">
      Health overview
    </Heading>
    <MetricCards>{children}</MetricCards>
  </Box>
);

// Tile with the section's surface applied, so tiles only describe content.
export const HealthTile = (props: ComponentProps<typeof MetricCard>) => (
  <MetricCard background={surfaceBackground} {...props} />
);
