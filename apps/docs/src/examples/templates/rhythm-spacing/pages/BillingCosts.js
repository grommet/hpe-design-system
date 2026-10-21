// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Chart, Text } from 'grommet';
import { Download } from '@hpe-design/icons-grommet';
import {
  Bar,
  CardGrid,
  MetricTile,
  PageColumns,
  PageSections,
  Panel,
  PeerStack,
  RhythmPage,
  Section,
} from '../components';

const summary = [
  { title: 'Month to date', value: '$284k', description: 'Oct 1 to Oct 21.' },
  {
    title: 'Forecast',
    value: '$341k',
    status: 'warning',
    statusLabel: '$21k over budget',
    description: 'Projected for October.',
  },
  { title: 'Budget', value: '$320k', description: 'Set for October.' },
  { title: 'Last month', value: '$297k', description: 'September total.' },
];

const byService = [
  { name: 'Compute', cost: 132, max: 140 },
  { name: 'Storage', cost: 88, max: 140 },
  { name: 'Networking', cost: 41, max: 140 },
  { name: 'Data services', cost: 23, max: 140 },
];

const trend = [243, 241, 247, 250, 252, 257, 261, 265, 270, 284];

const budgets = [
  { name: 'Production', used: 92, status: 'warning', detail: '$184k of $200k' },
  { name: 'Staging', used: 48, status: 'ok', detail: '$38k of $80k' },
  { name: 'Development', used: 35, status: 'ok', detail: '$14k of $40k' },
];

// Cost overview: summary tiles and charts in the main column, budget status
// in a side column.
export const BillingCosts = () => (
  <RhythmPage
    title="Billing and costs"
    subtitle="October 2026"
    actions={<Button label="Export report" icon={<Download />} secondary />}
  >
    <PageColumns>
      <PageSections>
        <Section title="Spend summary">
          <CardGrid>
            {summary.map(item => (
              <MetricTile key={item.title} {...item} />
            ))}
          </CardGrid>
        </Section>
        <Section title="Monthly trend">
          <Panel title="Spend by month" subtitle="Thousands of USD">
            <Chart
              type="bar"
              bounds={[
                [0, trend.length - 1],
                [0, 300],
              ]}
              values={trend.map((value, index) => ({ value: [index, value] }))}
              size={{ width: 'full', height: 'xsmall' }}
              thickness="small"
              round
              a11yTitle="Monthly spend, rising from 243 to 284 thousand dollars"
            />
          </Panel>
        </Section>
        <Section title="Cost by service">
          <CardGrid>
            {byService.map(({ cost, max, name }) => (
              <Panel key={name} title={name}>
                <Box gap="xsmall">
                  <Bar label={`$${cost}k`} max={max} value={cost} />
                  <Text>${cost}k</Text>
                </Box>
              </Panel>
            ))}
          </CardGrid>
        </Section>
      </PageSections>
      <PageSections>
        <Section title="Budgets">
          <PeerStack>
            {budgets.map(({ detail, name, status, used }) => (
              <Panel key={name} title={name}>
                <Box gap="xsmall">
                  <Bar
                    label={`${used}% of budget used`}
                    max={100}
                    value={used}
                    status={status}
                  />
                  <Text>{used}% of budget used</Text>
                  <Text size="small">{detail}</Text>
                </Box>
              </Panel>
            ))}
          </PeerStack>
        </Section>
        <Section title="Billing contacts">
          <Panel title="Finance team">
            <Text>finance@example.com</Text>
            <Text size="small">Receives invoices and budget alerts.</Text>
          </Panel>
        </Section>
      </PageSections>
    </PageColumns>
  </RhythmPage>
);
