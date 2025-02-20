import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Page, PageContent, PageHeader } from 'grommet';
import { RoutedAnchor, NavSidebar } from '../../../../components';
import { Previous } from 'grommet-icons';
import { NavItems } from './navItems';
import { ServersTable } from './ServersTable';

const defaultSelected = NavItems['Container Orchestration'];

export const OpsRamp: React.FC = () => {
  return (
    <Box direction="row" fill>
      <NavSidebar
        title="Resource Categories"
        active={defaultSelected}
        items={NavItems}
        flex="grow"
      />
      <Page pad={{ bottom: 'xlarge' }}>
        <PageContent>
          <PageHeader
            title="Kubernetes"
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
