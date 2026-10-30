// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useMemo, useState } from 'react';
import type { ComponentProps, MouseEvent, SetStateAction } from 'react';
import {
  Box,
  Button,
  Grid,
  Main,
  Menu,
  Nav,
  Page,
  PageContent,
  PageHeader,
  Paragraph,
  ResponsiveContext,
  Tab,
  Tabs,
  ThemeContext,
} from 'grommet';
import {
  Apps,
  Beacon,
  Cloud,
  Console,
  Cube,
  Sidebar,
  Storage,
  VirtualStorage,
} from '@hpe-design/icons-grommet';
import { defaultUser, GlobalHeader, UserContext } from '../global-header';
import { AppContainer } from '../page-layouts/components';
import { ReverseAnchor } from '../ReverseAnchor';
import {
  CopilotConversation,
  CopilotPanel,
  SubscribedDevices,
  SubscriptionSummary,
} from './content/subscription';
import {
  followUpPrompts,
  pageBackground,
  raisedBackground,
  subscription,
  surfaceBackground,
} from './content/subscription/data';

const assistantName = 'GreenLake Copilot';
const assistantToggleId = 'copilot-toggle';
const assistantPanelId = 'copilot-panel';

const navigation = [
  { label: 'Workloads', icon: <Cube /> },
  { label: 'Console', icon: <Console /> },
  { label: 'Applications', icon: <Apps /> },
  { label: 'Cloud services', icon: <Cloud /> },
  { label: 'Storage', icon: <Storage /> },
  { label: 'Virtual storage', icon: <VirtualStorage /> },
  { label: 'Monitoring', icon: <Beacon /> },
];

// The assistant always occupies a shell column, reducing the page width
// rather than covering its content.
const shell: Record<
  'navAndPanel' | 'panel' | 'nav' | 'mainOnly',
  Pick<ComponentProps<typeof Grid>, 'columns' | 'rows' | 'areas'>
> = {
  navAndPanel: {
    columns: ['auto', 'flex', 'auto'],
    rows: ['auto', 'flex'],
    areas: [
      ['header', 'header', 'header'],
      ['nav', 'main', 'panel'],
    ],
  },
  nav: {
    columns: ['auto', 'flex'],
    rows: ['auto', 'flex'],
    areas: [
      ['header', 'header'],
      ['nav', 'main'],
    ],
  },
  panel: {
    columns: ['flex', 'auto'],
    rows: ['auto', 'flex'],
    areas: [
      ['header', 'header'],
      ['main', 'panel'],
    ],
  },
  mainOnly: {
    columns: ['flex'],
    rows: ['auto', 'flex'],
    areas: [['header'], ['main']],
  },
};

const pageSpacing = { pad: { horizontal: 'xlarge' } };
const pageTheme = {
  page: {
    full: {
      xsmall: pageSpacing,
      small: pageSpacing,
      medium: pageSpacing,
      large: pageSpacing,
      xlarge: pageSpacing,
    },
  },
};

// In an application this would return to the subscriptions list.
const openSubscriptions = (event: MouseEvent) => event.preventDefault();

const actions = [
  { label: 'Renew subscription' },
  { label: 'Transfer devices' },
  { label: 'Download report' },
  { label: 'Cancel subscription' },
];

// Details is the only tab with content in this example; the others stand
// in for the activity log and order history the application would show.
function DetailsTabs() {
  return (
    <Tabs justify="start">
      <Tab title="Details">
        <Box pad={{ top: 'small' }} gap="xlarge">
          <SubscriptionSummary />
          <SubscribedDevices />
        </Box>
      </Tab>
      <Tab title="Activity">
        <Box pad={{ top: 'small' }}>
          <Paragraph margin="none">
            Recent activity for this subscription would be listed here.
          </Paragraph>
        </Box>
      </Tab>
      <Tab title="Order details">
        <Box pad={{ top: 'small' }}>
          <Paragraph margin="none">
            The purchase order and billing details would be shown here.
          </Paragraph>
        </Box>
      </Tab>
    </Tabs>
  );
}

// Collapsed, icon-only primary navigation rail.
function SideNav({ ...rest }: Pick<ComponentProps<typeof Box>, 'gridArea'>) {
  return (
    <Box pad="xsmall" flex={false} {...rest}>
      <Nav
        a11yTitle="Primary"
        align="center"
        background={surfaceBackground}
        fill="vertical"
        gap="4xsmall"
        pad={{ vertical: '3xsmall' }}
        round="large"
        width="5xsmall"
      >
        <Button
          icon={<Sidebar />}
          a11yTitle="Expand navigation"
          tip="Expand navigation"
        />
        {navigation.map(({ icon, label }) => (
          <Button key={label} icon={icon} a11yTitle={label} tip={label} />
        ))}
      </Nav>
    </Box>
  );
}

export const SubscriptionDetails = () => {
  const size = useContext(ResponsiveContext);
  const [user, setUser] = useState<typeof defaultUser | undefined>(defaultUser);
  const contextValue = useMemo(
    () => ({
      user: user ?? {},
      setUser: (value?: SetStateAction<typeof defaultUser | undefined>) =>
        setUser(value),
    }),
    [user],
  );
  // The assistant is open on arrival so the page is seen with its answer.
  const [assistantOpen, setAssistantOpen] = useState(true);

  const small = size === 'xsmall' || size === 'small';
  // On small screens the navigation would move into a drawer opened from
  // the global header; it is omitted here to keep the example focused.
  const showNav = !small;
  const { areas, columns, rows } = assistantOpen
    ? shell[showNav ? 'navAndPanel' : 'panel']
    : shell[showNav ? 'nav' : 'mainOnly'];

  // Return focus to the control that opened the pane so keyboard users are
  // not dropped at the top of the document when it closes.
  const closeAssistant = () => {
    setAssistantOpen(false);
    document.getElementById(assistantToggleId)?.focus();
  };

  const panelProps = {
    id: assistantPanelId,
    title: assistantName,
    background: surfaceBackground,
    raisedBackground,
    disclaimer: `${assistantName} is AI and can make mistakes.`,
    placeholder: 'Ask anything about HPE GreenLake...',
    prompts: followUpPrompts,
    onClose: closeAssistant,
  };

  return (
    <UserContext.Provider value={contextValue}>
      <AppContainer background={pageBackground}>
        {/* The shell fills the viewport and the page scrolls inside Main, so
            the header, navigation, and assistant stay in place. */}
        <Grid columns={columns} rows={rows} areas={areas} height="100vh">
          <Box gridArea="header">
            <GlobalHeader
              assistant={{
                id: assistantToggleId,
                label: assistantName,
                open: assistantOpen,
                controls: assistantPanelId,
                onToggle: () =>
                  assistantOpen ? closeAssistant() : setAssistantOpen(true),
              }}
            />
          </Box>
          {showNav && <SideNav gridArea="nav" />}
          <Main gridArea="main" overflow="auto">
            {/* Page sizes to its content so its bottom padding follows the
                list rather than the viewport. */}
            <ThemeContext.Extend value={pageTheme}>
              <Page kind="full" pad={{ bottom: '3xlarge' }} flex={false}>
                {/* PageHeader already pads below itself, so a medium gap is
                    enough before the tabs. */}
                <PageContent gap="medium" responsive={false}>
                  <PageHeader
                    title={subscription.key}
                    subtitle={`${subscription.tier} • ${subscription.product}`}
                    parent={
                      <ReverseAnchor
                        label="Device subscriptions"
                        href="#"
                        onClick={openSubscriptions}
                      />
                    }
                    actions={
                      <Menu
                        label="Actions"
                        a11yTitle="Actions"
                        items={actions}
                        dropAlign={{ top: 'bottom', right: 'right' }}
                      />
                    }
                  />
                  <DetailsTabs />
                </PageContent>
              </Page>
            </ThemeContext.Extend>
          </Main>
          {assistantOpen && (
            <Box
              gridArea="panel"
              pad={{ vertical: 'xsmall', right: 'xsmall' }}
              flex={false}
            >
              <CopilotPanel {...panelProps} width="medium">
                <CopilotConversation />
              </CopilotPanel>
            </Box>
          )}
        </Grid>
      </AppContainer>
    </UserContext.Provider>
  );
};
