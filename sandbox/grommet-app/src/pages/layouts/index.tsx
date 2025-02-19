import React from "react";
import { Link, Outlet, Route } from 'react-router-dom';
import { List, Page, PageContent, PageHeader } from "grommet";
import { RoutedAnchor } from '../../components';
import { Collection, EmptyState, Form, NavigationalSidebar } from './kinds';

const layouts = [
  'Collection',
  'Dashboard',
  'Detail',
  'Empty state',
  'Form',
  'Home',
  'List',
  'Login',
  'Main',
  'Navigational sidebar',
  'NotFound',
  'Settings',
  'Splash',
  'Wizard'
];

const Layouts = () => {
  return (
    <Outlet />
  );
};

const LayoutsIndex = () => {
  return (
    <Page pad={{ bottom: "xlarge" }}>
      <PageContent>
        <PageHeader title="Layouts" />
        <List
          data={layouts}
          defaultItemProps={{ pad: { vertical: 'xxsmall' } }}
        >
          {item => (
            <RoutedAnchor
              key={item}
              as={Link}
              to={`/layouts/${item.toLowerCase().replace(' ', '-')}`}
              label={item}
              alignSelf="start"
            />
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
  <Route key="form" path="/layouts/form" element={<Form />} />,
  <Route key="navigational-sidebar" path="navigational-sidebar" element={<NavigationalSidebar />} />,
];

export { Layouts, routes };
