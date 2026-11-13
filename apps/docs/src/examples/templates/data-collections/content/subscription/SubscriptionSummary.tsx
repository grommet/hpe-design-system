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
        {detail && <Text>{detail}</Text>}
      </Box>
    </CardBody>
  </Card>
);

export const SubscriptionSummary = ({
  subscriptionData = subscription,
  statusLabel,
}: {
  subscriptionData?: typeof subscription;
  statusLabel?: string;
} = {}) => (
  <Box as="section" aria-label="Subscription summary">
    <Grid columns={{ count: 'fit', size: 'small' }} gap="small">
      <SummaryCard
        title="Subscription"
        detail={`Since ${formatDate(subscriptionData.started)}.`}
      >
        <MetricValue value={statusLabel || 'Started'} />
      </SummaryCard>
      <SummaryCard
        title={subscriptionData.daysRemaining < 0 ? 'Expired' : 'Expires in'}
        detail={`Renewal due on ${formatDate(subscriptionData.renewal)}.`}
      >
        <MetricValue
          value={Math.abs(subscriptionData.daysRemaining)}
          unit={subscriptionData.daysRemaining < 0 ? 'Days ago' : 'Days'}
        />
      </SummaryCard>
      <SummaryCard title="Devices assigned">
        <MetricValue value={subscriptionData.deviceCount} />
      </SummaryCard>
    </Grid>
  </Box>
);
