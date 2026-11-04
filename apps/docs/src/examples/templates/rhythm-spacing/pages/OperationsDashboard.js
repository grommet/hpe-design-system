// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Button, Text } from 'grommet';
import { Configure } from '@hpe-design/icons-grommet';
import {
  Bar,
  CardGrid,
  EventList,
  MetricTile,
  PageColumns,
  PageSections,
  Panel,
  PeerStack,
  RhythmPage,
  Section,
} from '../components';

const health = [
  {
    title: 'Servers online',
    value: 482,
    unit: 'of 490',
    status: 'warning',
    statusLabel: '8 servers offline',
  },
  {
    title: 'Power draw',
    value: 38.4,
    unit: 'kW',
    status: 'ok',
    statusLabel: 'Within budget',
  },
  {
    title: 'Open alerts',
    value: 17,
    status: 'critical',
    statusLabel: '3 need action now',
  },
  {
    title: 'Firmware compliance',
    value: 94,
    unit: '%',
    status: 'ok',
    statusLabel: '28 servers to update',
  },
];

const workloads = [
  { name: 'Production', used: 72, detail: '1,240 of 1,720 vCPUs' },
  { name: 'Staging', used: 41, detail: '328 of 800 vCPUs' },
  { name: 'Development', used: 58, detail: '232 of 400 vCPUs' },
];

const storage = [
  {
    name: 'Primary arrays',
    used: 81,
    status: 'warning',
    detail: '648 of 800 TB',
  },
  { name: 'Backup', used: 46, status: 'ok', detail: '184 of 400 TB' },
  { name: 'Archive', used: 23, status: 'ok', detail: '115 of 500 TB' },
];

const activity = [
  {
    status: 'critical',
    text: 'Drive failure in Frankfurt-DC2',
    time: '12 min ago',
  },
  {
    status: 'warning',
    text: 'Firmware update delayed on 6 servers',
    time: '1 hour ago',
  },
  {
    status: 'ok',
    text: 'Backup job completed for Production',
    time: '3 hours ago',
  },
  { status: 'ok', text: 'Capacity forecast refreshed', time: 'Yesterday' },
];

const maintenance = [
  {
    title: 'Network switch upgrade',
    when: 'Oct 24, 02:00 UTC',
    scope: 'Frankfurt-DC1',
  },
  {
    title: 'Storage controller patch',
    when: 'Oct 29, 04:00 UTC',
    scope: 'London-DC3',
  },
];

// Two-column dashboard. The main column stacks content sections of cards,
// the side column holds supporting feeds.
export const OperationsDashboard = () => (
  <RhythmPage
    title="Operations"
    actions={<Button label="Customize" icon={<Configure />} secondary />}
  >
    <PageColumns>
      <PageSections>
        <Section title="Infrastructure health">
          <CardGrid>
            {health.map(item => (
              <MetricTile key={item.title} {...item} />
            ))}
          </CardGrid>
        </Section>
        <Section title="Workloads">
          <CardGrid size="xsmall">
            {workloads.map(({ detail, name, used }) => (
              <Panel key={name} title={name}>
                <Box gap="xsmall">
                  <Bar label={`${used}% used`} max={100} value={used} />
                  <Text>{used}% used</Text>
                  <Text size="small">{detail}</Text>
                </Box>
              </Panel>
            ))}
          </CardGrid>
        </Section>
        <Section title="Storage">
          <CardGrid size="xsmall">
            {storage.map(({ detail, name, status, used }) => (
              <Panel key={name} title={name}>
                <Box gap="xsmall">
                  <Bar
                    label={`${used}% used`}
                    max={100}
                    value={used}
                    status={status}
                  />
                  <Text>{used}% used</Text>
                  <Text size="small">{detail}</Text>
                </Box>
              </Panel>
            ))}
          </CardGrid>
        </Section>
      </PageSections>
      <PageSections>
        <Section title="Recent activity">
          <Panel title="Last 24 hours" level={3}>
            <EventList a11yTitle="Recent activity" items={activity} />
          </Panel>
        </Section>
        <Section title="Upcoming maintenance">
          <PeerStack>
            {maintenance.map(({ scope, title, when }) => (
              <Panel key={title} title={title}>
                <Text>{when}</Text>
                <Text size="small">{scope}</Text>
              </Panel>
            ))}
          </PeerStack>
        </Section>
      </PageSections>
    </PageColumns>
  </RhythmPage>
);
