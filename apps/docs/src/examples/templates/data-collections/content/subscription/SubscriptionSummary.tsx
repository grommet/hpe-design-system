// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ReactNode } from 'react';
import { Box, Card, CardBody, CardHeader, Grid, Heading, Text } from 'grommet';
import { MetricValue } from './MetricValue';
import { formatDate, subscription, surfaceBackground } from './data';

type SummaryCardProps = {
  children: ReactNode;
  detail?: string;
  title: string;
};

// One fact about the subscription: a title, a headline value, and an
// optional line of supporting detail beneath it.
const SummaryCard = ({ children, detail, title }: SummaryCardProps) => (
  <Card background={surfaceBackground}>
    {/* The header's bottom padding is removed so the title and headline
        value are separated by the body's padding alone (one step). */}
    <CardHeader pad={{ horizontal: 'medium', top: 'medium', bottom: 'none' }}>
      <Heading level={2} margin="none">
        {title}
      </Heading>
    </CardHeader>
    <CardBody>
      <Box gap="xxsmall">
        {children}
        {detail && <Text size="xsmall">{detail}</Text>}
      </Box>
    </CardBody>
  </Card>
);

export const SubscriptionSummary = () => (
  <Box as="section" aria-label="Subscription summary">
    <Grid columns={{ count: 'fit', size: 'small' }} gap="small">
      <SummaryCard
        title="Subscription"
        detail={`Since ${formatDate(subscription.started)}.`}
      >
        <MetricValue value="Started" />
      </SummaryCard>
      <SummaryCard
        title="Expires in"
        detail={`Renewal due on ${formatDate(subscription.renewal)}.`}
      >
        <MetricValue value={subscription.daysRemaining} unit="Days" />
      </SummaryCard>
      <SummaryCard title="Devices assigned">
        <MetricValue value={subscription.deviceCount} />
      </SummaryCard>
    </Grid>
  </Box>
);
