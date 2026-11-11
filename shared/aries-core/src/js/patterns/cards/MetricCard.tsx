// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactNode } from 'react';
import { Box, Card, CardBody, Heading, Text } from 'grommet';

export type MetricCardProps = Omit<ComponentProps<typeof Card>, 'children'> & {
  children?: ReactNode;
  description?: ReactNode;
  level?: ComponentProps<typeof Heading>['level'];
  title: string;
};

export const MetricCard = ({
  children,
  description,
  level = 3,
  title,
  ...rest
}: MetricCardProps) => (
  <Card {...rest}>
    <CardBody gap="small">
      <Heading level={level} margin="none">
        {title}
      </Heading>
      {/* Descriptions follow the card content at its normal gap instead of
          being pinned to the bottom, leaving any spare height below. */}
      <Box gap="xsmall" flex>
        {children}
        {description && <Text>{description}</Text>}
      </Box>
    </CardBody>
  </Card>
);