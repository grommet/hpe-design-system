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
  const [selectedName, setSelectedName] = useState<string>('');
  const [selectedIpAddress, setSelectedIpAddress] = useState<string>('');

  // when resource details is shown, the primary focus
  // is on the resource details, so it should have a larger
  // width than the table.
  const gridColumns = [
    ['medium', 'auto'],
    ['small', 'medium'],
  ];

  const columnsGap = {
    xsmall: 'xsmall',
    small: 'xsmall',
    medium: 'small',
    large: 'medium',
    xlarge: 'medium',
  };

  const gap = {
    column: columnsGap[breakpoint],
  };

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
          <Grid
            columns={showResultDetails ? gridColumns : 'full'}
            gap={{ column: gap.column }}
          >
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
                setSelectedName={setSelectedName}
                setSelectedIpAddress={setSelectedIpAddress}
              />
            </ContentPane>
            {/* when screen is going from large to medium and side nav is open, 
            the ResourceDetails component the menu is getting cut off I can move it 
            dowm to be column instread of row. */}
            {showResultDetails && (
              <ResourceDetails
                layer={['xsmall', 'small', 'medium'].includes(breakpoint)}
                onClose={() => setShowResultDetails(false)}
                animation={
                  ['xsmall', 'small', 'medium'].includes(breakpoint)
                    ? false
                    : ['slideLeft', 'fadeIn']
                }
                name={selectedName}
                ipAddress={selectedIpAddress}
              />
            )}
          </Grid>
        </PageContent>
      </Page>
    </Box>
  );
};
