// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Button } from 'grommet';
import { Search } from '@hpe-design/icons-grommet';
import { ServiceCard } from '../../dashboards/components/ServiceCard';
import { CardGrid, PageSections, RhythmPage, Section } from '../components';
import { surfaceBackground } from '../components/RhythmPage';

const catalog = [
  {
    title: 'Featured',
    services: [
      {
        category: 'Compute',
        title: 'Private Cloud Business Edition',
        description:
          'Deploy and manage virtual machines on-premises with cloud agility.',
        tag: 'New',
      },
      {
        category: 'Storage',
        title: 'Alletra Storage MP',
        description: 'Block and file storage that scales independently.',
      },
      {
        category: 'Networking',
        title: 'Aruba Central',
        description: 'Cloud-native management for wired, wireless, and WAN.',
      },
    ],
  },
  {
    title: 'Compute',
    services: [
      {
        category: 'Compute',
        title: 'Compute Ops Management',
        description: 'Automate firmware, health, and lifecycle of servers.',
      },
      {
        category: 'Compute',
        title: 'Bare metal',
        description: 'Dedicated servers provisioned on demand.',
      },
      {
        category: 'Compute',
        title: 'Virtual machines',
        description: 'Elastic virtual machines billed by usage.',
      },
      {
        category: 'Compute',
        title: 'Containers',
        description: 'Run Kubernetes clusters with managed upgrades.',
        tag: 'Preview',
      },
    ],
  },
  {
    title: 'Storage',
    services: [
      {
        category: 'Storage',
        title: 'Block storage',
        description: 'Low-latency volumes with built-in protection.',
      },
      {
        category: 'Storage',
        title: 'File storage',
        description: 'Shared file systems with snapshots and quotas.',
      },
      {
        category: 'Storage',
        title: 'Object storage',
        description: 'S3-compatible storage for unstructured data.',
      },
    ],
  },
  {
    title: 'Networking',
    services: [
      {
        category: 'Networking',
        title: 'Virtual networks',
        description: 'Isolated networks with software-defined routing.',
      },
      {
        category: 'Networking',
        title: 'Load balancing',
        description: 'Distribute traffic across workloads automatically.',
      },
      {
        category: 'Networking',
        title: 'Private connectivity',
        description: 'Dedicated links between sites and cloud regions.',
      },
    ],
  },
];

// A single-column catalog: several content sections, each a heading over a
// grid of peer cards. This is the purest test of section and peer gaps.
export const ServiceCatalog = () => (
  <RhythmPage
    title="Services"
    subtitle="Browse and launch HPE GreenLake services."
    actions={<Button label="Search catalog" icon={<Search />} secondary />}
  >
    <PageSections>
      {catalog.map(({ services, title }) => (
        <Section key={title} title={title}>
          <CardGrid>
            {services.map(service => (
              <ServiceCard
                key={service.title}
                background={surfaceBackground}
                a11yTitle={`Explore ${service.title}`}
                onClick={() => {}}
                {...service}
              />
            ))}
          </CardGrid>
        </Section>
      ))}
    </PageSections>
  </RhythmPage>
);
