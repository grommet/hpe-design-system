import React from "react";
import { Link, Outlet, Route } from 'react-router-dom';
import { Box, List, Page, PageContent, PageHeader } from "grommet";
import { NavSidebar, RoutedAnchor } from '../../components';
import { Collection, EmptyState } from './kinds';

const layouts = ['Collection', 'Dashboard', 'Detail', 'Empty state', 'Form', 'Home', 'List', 'Login', 'Main', 'NotFound', 'Settings', 'Splash', 'Wizard'];

const Layouts = () => {
  return (
    <Box direction="row">
      <NavSidebar />
      <Outlet />
    </Box>
  );
};

const LayoutsIndex = () => {
  return (
    <Page pad={{ bottom: "xlarge" }}>
      <PageContent>
        <PageHeader title="Layouts" />
        <List data={layouts} defaultItemProps={{ pad: { vertical: 'xxsmall' } }}>
          {(item) => (
            <RoutedAnchor key={item} as={Link} to={`/layouts/${item.toLowerCase().replace(' ', '-')}`} label={item} alignSelf="start" />
          )}
        </List>
      </PageContent>
    </Page>
  );
};

const routes = [
  <Route key="layouts" index element={<LayoutsIndex />} />,
  <Route key="collection" path="collection" element={<Collection />} />,
  <Route key="dashboard" path="dashboard" element={<div>Dashboard</div>} />,
  <Route key="empty-state" path="empty-state" element={<EmptyState />} />,
]

export { Layouts, routes };
