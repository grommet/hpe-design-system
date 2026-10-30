// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ReactNode } from 'react';
import { Box, Card, CardBody, CardHeader, Paragraph, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';
import { AssistantMessage, UserMessage, useCopilotPanel } from './CopilotPanel';
import { MetricValue, type MetricValueProps } from './MetricValue';
import { refreshSavings, subscription } from './data';

type SavingProps = Omit<MetricValueProps, 'size' | 'trendDirection'> & {
  children: ReactNode;
  label: string;
};

// One projected saving: what is reduced, by how much, and the before and
// after it is measured against.
const Saving = ({ children, label, ...metric }: SavingProps) => (
  <Box gap="xxsmall">
    <TextEmphasis>{label}</TextEmphasis>
    <MetricValue size="3xl" trendDirection="down" {...metric} />
    <Text size="xsmall">{children}</Text>
  </Box>
);

// Emphasised figure inside a saving's supporting sentence.
const Figure = ({ children }: { children: ReactNode }) => (
  <TextEmphasis size="xsmall">{children}</TextEmphasis>
);

// Card the assistant includes in its reply. It sits on the panel surface,
// so it takes the raised background rather than the page's card surface.
const RefreshSavingsCard = () => {
  const { raisedBackground } = useCopilotPanel();
  const { cost, emissions, scope, title } = refreshSavings;
  return (
    <Card background={raisedBackground}>
      <CardHeader
        pad={{ horizontal: 'medium', top: 'medium', bottom: 'none' }}
        align="start"
      >
        <Box>
          <TextEmphasis>{title}</TextEmphasis>
          <Text size="small">{scope}</Text>
        </Box>
      </CardHeader>
      <CardBody>
        <Box gap="small">
          <Saving
            label={emissions.label}
            value={emissions.value}
            unit={emissions.unit}
            trend={emissions.change}
          >
            Down from <Figure>{emissions.from}</Figure> to{' '}
            <Figure>{emissions.to}</Figure>, starting the day Gen12 is
            installed.
          </Saving>
          <Box
            border={{ side: 'top', color: 'border-weak' }}
            pad={{ top: 'small' }}
          >
            <Saving
              label={cost.label}
              value={cost.value}
              unit={cost.unit}
              trend={cost.change}
            >
              Down from <Figure>{cost.from}</Figure> to{' '}
              <Figure>{cost.to}</Figure>. The {cost.hardware} hardware pays for
              itself by <Figure>{cost.breakEven}</Figure>.
            </Saving>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

const licensed = `${subscription.deviceCount} licensed devices`;
const { tier } = subscription;

// The conversation shown when the page opens: the user's question about
// refreshing the subscribed fleet and the assistant's answer.
export const CopilotConversation = () => (
  <Box gap="medium" flex={false}>
    <UserMessage>
      How does upgrading these {subscription.deviceCount} devices to newer
      ProLiant models affect carbon emissions versus cost over the next 3 years?
    </UserMessage>
    <AssistantMessage>
      <Paragraph margin="none">
        Your <TextEmphasis>{licensed}</TextEmphasis> under {tier} skew Gen9 and
        Gen11. A refresh to Gen12 cuts power draw immediately; cost takes longer
        to turn positive, but it does within this subscription&apos;s remaining
        term.
      </Paragraph>
      <RefreshSavingsCard />
    </AssistantMessage>
  </Box>
);
