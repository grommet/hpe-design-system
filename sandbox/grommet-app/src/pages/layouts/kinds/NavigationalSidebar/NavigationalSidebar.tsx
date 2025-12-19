import React from 'react';
import { Box, Page, PageContent, PageHeader } from 'grommet';
import { Left } from '@hpe-design/icons-grommet';
import { Link } from 'react-router-dom';
import { NavSidebar, RoutedAnchor } from '../../../../components';
import { navItems } from './navItems';
import { appHeight } from '../../../../App';

const defaultSelected = navItems['Dashboard'];

export const NavigationalSidebar = () => {
  return (
    <Box direction="row">
      <NavSidebar
        title="Private Cloud"
        active={defaultSelected}
        items={navItems}
        height={appHeight}
      />
      <Page pad={{ bottom: 'xlarge' }}>
        <PageContent alignSelf="start">
          <PageHeader
            title="Navigational sidebar"
            subtitle="Demonstrates how a collapsible sidebar can be used for navigation."
            parent={
              <RoutedAnchor
                as={Link}
                to="/layouts"
                label="Layouts"
                icon={<Left />}
              />
            }
          />
        </PageContent>
      </Page>
    </Box>
  );
};
