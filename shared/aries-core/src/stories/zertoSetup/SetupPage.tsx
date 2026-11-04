// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import {
  Box,
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
import {
  Selector as SelectorJs,
  SelectorGroup as SelectorGroupJs,
} from '../../js/components/core/Selector';
import { type Loose } from './loose';

const Selector = SelectorJs as Loose<typeof SelectorJs>;
const SelectorGroup = SelectorGroupJs as Loose<typeof SelectorGroupJs>;

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
}

const summary: SummaryMetric[] = [
  { title: 'VRAs', value: '1', description: 'Installed' },
  { title: 'Datastores', value: '3', description: 'Available' },
  { title: 'Repositories', value: '9', description: '7 connected' },
  {
    title: 'Guest services credentials',
    value: '0',
    description: 'None configured',
  },
];

interface SetupPageProps {
  children: React.ReactNode;
}

/**
 * Application shell recreating the Zerto "Setup" screen with HPE Design System
 * layout primitives: persistent navigation, a routed page with a single h1,
 * a group of summary Selectors (quick-filter tiles that don't filter here),
 * and a section for the table.
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
        {/* flex={false} lets Page grow with its content so the 3xlarge bottom
            pad sits below the table instead of being swallowed by the
            scrolling Main. */}
        <Page pad={{ bottom: '3xlarge' }} flex={false}>
          <PageContent>
            {/* PageHeader's theme bottom pad (medium) is the only space
                before the Selectors; sections below are spaced xlarge. */}
            <PageHeader
              title="Setup"
              subtitle="Repositories, VRAs, datastores and credentials for site gui_local_vcd."
            />
            <Box gap="xlarge">
              <SelectorGroup a11yTitle="Site summary">
                {summary.map(({ title, value, description }) => (
                  <Selector
                    key={title}
                    value={title}
                    title={title}
                    description={
                      <Text size="xxlarge" weight="bold" color="text-strong">
                        {value}
                      </Text>
                    }
                  >
                    <Text color="text-weak">{description}</Text>
                  </Selector>
                ))}
              </SelectorGroup>
              <Box as="section" gap="small">
                <Heading id="repositories-heading" level={2} margin="none">
                  Repositories
                </Heading>
                <Box background="background-front" pad="medium" round="medium">
                  {children}
                </Box>
              </Box>
            </Box>
          </PageContent>
        </Page>
      </Main>
    </Grid>
  );
};
