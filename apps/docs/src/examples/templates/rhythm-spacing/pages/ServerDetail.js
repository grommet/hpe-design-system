// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Anchor,
  Box,
  Button,
  NameValueList,
  NameValuePair,
  Text,
} from 'grommet';
import { Power } from '@hpe-design/icons-grommet';
import {
  Bar,
  CardGrid,
  EventList,
  PageColumns,
  PageSections,
  Panel,
  PeerStack,
  RhythmPage,
  Section,
} from '../components';

const properties = [
  ['Model', 'HPE ProLiant DL380 Gen11'],
  ['Serial number', 'CZ2D4600KX'],
  ['Location', 'Frankfurt-DC2, rack 14, U22'],
  ['Operating system', 'VMware ESXi 8.0 U2'],
  ['Firmware', 'U54 v2.90 (up to date)'],
  ['Subscription', 'Active until Mar 12, 2028'],
];

const utilization = [
  { name: 'CPU', used: 64, detail: '2 sockets, 64 cores' },
  { name: 'Memory', used: 78, detail: '392 of 512 GB' },
  { name: 'Storage', used: 52, detail: '12.5 of 24 TB' },
];

const events = [
  { status: 'warning', text: 'Fan 3 speed above normal', time: '25 min ago' },
  { status: 'ok', text: 'Firmware update completed', time: 'Oct 18' },
  { status: 'ok', text: 'Backup completed', time: 'Oct 18' },
  { status: 'ok', text: 'Server restarted by admin', time: 'Oct 12' },
];

const related = [
  { title: 'Cluster', value: 'prod-esx-cluster-02' },
  { title: 'Workloads', value: '36 virtual machines' },
  { title: 'Network', value: 'Core switch fra2-sw-05' },
];

// Resource detail page: a main column of descriptive sections beside a
// column of related resources.
export const ServerDetail = () => (
  <RhythmPage
    title="fra2-esx-014"
    subtitle="HPE ProLiant DL380 Gen11"
    parent={<Anchor label="Servers" href="#" />}
    actions={<Button label="Power actions" icon={<Power />} secondary />}
  >
    <PageColumns>
      <PageSections>
        <Section title="Overview">
          <Panel title="Properties">
            <NameValueList layout="grid">
              {properties.map(([name, value]) => (
                <NameValuePair key={name} name={name}>
                  <Text>{value}</Text>
                </NameValuePair>
              ))}
            </NameValueList>
          </Panel>
        </Section>
        <Section title="Utilization">
          <CardGrid>
            {utilization.map(({ detail, name, used }) => (
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
        <Section title="Events">
          <Panel title="Last 30 days">
            <EventList a11yTitle="Server events" items={events} />
          </Panel>
        </Section>
      </PageSections>
      <PageSections>
        <Section title="Related resources">
          <PeerStack>
            {related.map(({ title, value }) => (
              <Panel key={title} title={title}>
                <Anchor label={value} href="#" />
              </Panel>
            ))}
          </PeerStack>
        </Section>
      </PageSections>
    </PageColumns>
  </RhythmPage>
);
