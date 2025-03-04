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
import { NavItems } from './navItems';
import { ServersTable } from './ServersTable';
import { ResourceDetails } from './ResourceDetails';

const defaultSelected = NavItems['Container Orchestration'][0];

export const OpsRamp: React.FC = () => {
  const breakpoint = React.useContext(ResponsiveContext);
  const isSidebarCollapsed = ['xsmall', 'small'].includes(breakpoint);

  const [showResultDetails, setShowResultDetails] = useState(false);

  const gridColumns = ['xsmall', 'small'].includes(breakpoint)
    ? ['flex', 'auto']
    : ['auto', 'auto'];

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

  const areasDefault = [['datetable', 'resourcedetails']];

  const areasSmall = [['datatable', 'unassigned']];

  const areas = ['xsmall', 'small'].includes(breakpoint)
    ? areasSmall
    : areasDefault;

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
          <Grid
            columns={showResultDetails ? gridColumns : 'full'}
            areas={showResultDetails ? areas : undefined}
            gap={{ column: gap.column }}
          >
            <ContentPane
              gridArea=""
              heading=""
              level={2}
              actions={undefined}
              skeleton={undefined}
              overflow="auto"
            >
              <ServersTable
                showResultDetails={showResultDetails}
                setShowResultDetails={setShowResultDetails}
              />
            </ContentPane>
            {showResultDetails && (
              <ResourceDetails
                layer={['xsmall', 'small', 'medium'].includes(breakpoint)}
                onClose={() => setShowResultDetails(false)}
                animation={
                  ['xsmall', 'small', 'medium'].includes(breakpoint)
                    ? false
                    : ['slideLeft', 'fadeIn']
                }
              />
            )}
          </Grid>
        </PageContent>
      </Page>
    </Box>
  );
};
