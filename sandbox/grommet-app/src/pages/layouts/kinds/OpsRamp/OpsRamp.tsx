import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Page,
  PageContent,
  PageHeader,
  Button,
  ResponsiveContext,
} from 'grommet';
import { RoutedAnchor, NavSidebar } from '../../../../components';
import { Previous } from 'grommet-icons';
import { NavItems } from './navItems';
import { ServersTable } from './ServersTable';

const defaultSelected = NavItems['Container Orchestration'][0];

export const OpsRamp: React.FC = () => {
  const breakpoint = React.useContext(ResponsiveContext);
  const isSidebarCollapsed = ['xsmall', 'small'].includes(breakpoint);

  return (
    <Box direction="row" fill>
      <NavSidebar
        title="Resource Categories"
        active={defaultSelected}
        items={NavItems}
        flex="grow"
        setExpanded={() => {}}
        sideBarOpen={!isSidebarCollapsed}
      />
      <Page pad={{ bottom: 'xlarge' }}>
        <PageContent>
          <PageHeader
            title="Kubernetes"
            actions={<Button label="Refresh" />}
            parent={
              <RoutedAnchor
                as={Link}
                to="/layouts"
                label="Layouts"
                icon={<Previous />}
              />
            }
          />
          <ServersTable />
        </PageContent>
      </Page>
    </Box>
  );
};
