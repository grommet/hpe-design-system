import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Grid,
  Page,
  PageContent,
  PageHeader,
  Button,
  ResponsiveContext,
} from 'grommet';
import { RoutedAnchor, NavSidebar } from '../../../../components';
import ContentPane from '../../../../components/ContentPane';
import { Previous } from 'grommet-icons';
import { OpsRampDetailItems } from '../NavigationalSidebar/navItems';
import { OpsRampDetailTable } from './OpsRampDetailTable';
import { ResourceDetails } from './ResourceDetails';

const defaultSelected = OpsRampDetailItems['Container Orchestration'][0];

export const OpsRampDetail: React.FC = () => {
  const breakpoint = React.useContext(ResponsiveContext);
  const isSidebarCollapsed = ['xsmall', 'small'].includes(breakpoint);

  const [showResultDetails, setShowResultDetails] = useState(false);

  return (
    <Box direction="row" fill>
      <NavSidebar
        title="Resource categories"
        active={defaultSelected}
        items={OpsRampDetailItems}
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
          <ContentPane
            heading={undefined}
            level={undefined}
            actions={undefined}
            skeleton={undefined}
            overflow="auto"
          >
            <OpsRampDetailTable
              showResultDetails={showResultDetails}
              setShowResultDetails={setShowResultDetails}
            />
          </ContentPane>
          {showResultDetails && (
            <ResourceDetails onClose={() => setShowResultDetails(false)} />
          )}
        </PageContent>
      </Page>
    </Box>
  );
};
