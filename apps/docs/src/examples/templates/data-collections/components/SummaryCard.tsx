// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ReactNode } from 'react';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Collapsible,
  Heading,
  Text,
} from 'grommet';

type SummaryCardProps = ComponentProps<typeof Card> & {
  detail?: ReactNode;
  detailed?: boolean;
  level?: ComponentProps<typeof Heading>['level'];
  subtitle?: string;
  title: string;
};

// A summary metric that can expand to show its supporting chart and detail.
// The headline value in `children` is always visible; `subtitle` and `detail`
// are wrapped in Collapsible so that toggling `detailed` on the page animates
// every card open or closed together.
export const SummaryCard = ({
  children,
  detail,
  detailed = false,
  level = 2,
  subtitle,
  title,
  ...rest
}: SummaryCardProps) => (
  <Card {...rest}>
    {/* The header's bottom padding is removed so the title and headline value
        are separated by the body's padding alone (one spacing step). */}
    <CardHeader pad={{ horizontal: 'medium', top: 'medium', bottom: 'none' }}>
      <Box fill="horizontal">
        <Heading level={level} margin="none">
          {title}
        </Heading>
        {subtitle && (
          <Collapsible open={detailed}>
            <Box pad={{ top: '5xsmall' }}>
              <Text size="small">{subtitle}</Text>
            </Box>
          </Collapsible>
        )}
      </Box>
    </CardHeader>
    <CardBody>
      {children}
      {detail && (
        <Collapsible open={detailed}>
          <Box pad={{ top: 'medium' }}>{detail}</Box>
        </Collapsible>
      )}
    </CardBody>
  </Card>
);
