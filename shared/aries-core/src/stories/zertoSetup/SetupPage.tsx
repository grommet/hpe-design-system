// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import {
  Anchor,
  Box,
  Card,
  CardBody,
  Grid,
  Heading,
  Main,
  Page,
  PageContent,
  PageHeader,
  Text,
} from 'grommet';
import {
  Analytics,
  Article,
  Book,
  Configure,
  Dashboard,
  Location,
  Monitor,
  Revert,
  ShieldSecurity,
  VirtualMachine,
} from '@hpe-design/icons-grommet';
import {
  NavigationMenu,
  type NavItemType,
} from '../../js/components/core/NavigationMenu';

const navItems: NavItemType[] = [
  { label: 'Dashboard', url: '/dashboard', icon: <Dashboard aria-hidden="true" /> },
  { label: 'Sites', url: '/sites', icon: <Location aria-hidden="true" /> },
  { label: 'VPGs', url: '/vpgs', icon: <ShieldSecurity aria-hidden="true" /> },
  { label: 'VMs', url: '/vms', icon: <VirtualMachine aria-hidden="true" /> },
  {
    label: 'Recovery plans',
    url: '/recovery-plans',
    icon: <Revert aria-hidden="true" />,
  },
  { label: 'Monitoring', url: '/monitoring', icon: <Monitor aria-hidden="true" /> },
  {
    label: 'Extended journal',
    url: '/extended-journal',
    icon: <Book aria-hidden="true" />,
  },
  { label: 'Reports', url: '/reports', icon: <Article aria-hidden="true" /> },
  { label: 'Analytics', url: '/analytics', icon: <Analytics aria-hidden="true" /> },
  { label: 'Setup', url: '/setup', icon: <Configure aria-hidden="true" /> },
];

interface SummaryMetric {
  title: string;
  value: string;
  description: string;
  action?: string;
}

const summary: SummaryMetric[] = [
  { title: 'VRAs', value: '1', description: 'Installed' },
  { title: 'Datastores', value: '3', description: 'Available' },
  { title: 'Repositories', value: '9', description: '7 connected' },
  {
    title: 'Guest services credentials',
    value: '0',
    description: 'None configured',
    action: 'Add credentials',
  },
];

interface SetupPageProps {
  children: React.ReactNode;
}

/**
 * Application shell recreating the Zerto "Setup" screen with HPE Design System
 * layout primitives: persistent navigation, a routed page with a single h1,
 * a fluid grid of self-contained summary cards, and a section for the table.
 */
export const SetupPage = ({ children }: SetupPageProps) => {
  const [activeItem, setActiveItem] = useState('Setup');

  return (
    <Grid
      areas={[['nav', 'main']]}
      columns={['auto', 'flex']}
      rows={['flex']}
      height="100vh"
    >
      <Box
        gridArea="nav"
        as="aside"
        aria-label="navigation"
        background="background-front"
      >
        <NavigationMenu
          title="Zerto"
          activeItem={activeItem}
          items={navItems}
          onSelect={({ item, event }) => {
            event.preventDefault();
            setActiveItem(item.label);
          }}
        />
      </Box>
      <Main gridArea="main" background="background-back" overflow="auto">
        <Page pad={{ bottom: '3xlarge' }}>
          <PageContent gap="xlarge">
            <PageHeader
              title="Setup"
              subtitle="Repositories, VRAs, datastores and credentials for site gui_local_vcd."
            />
            <Grid
              as="section"
              aria-label="Site summary"
              columns={{ count: 'fit', size: 'xsmall' }}
              gap="medium"
            >
              {summary.map(({ title, value, description, action }) => (
                <Card key={title}>
                  <CardBody gap="xsmall">
                    <Heading level={2} size="small" margin="none">
                      {title}
                    </Heading>
                    <Text size="xxlarge" weight="bold" color="text-strong">
                      {value}
                    </Text>
                    <Text color="text-weak">{description}</Text>
                    {action && <Anchor label={action} href="#" />}
                  </CardBody>
                </Card>
              ))}
            </Grid>
            <Box as="section" gap="small">
              <Heading id="repositories-heading" level={2} margin="none">
                Repositories
              </Heading>
              {children}
            </Box>
          </PageContent>
        </Page>
      </Main>
    </Grid>
  );
};
