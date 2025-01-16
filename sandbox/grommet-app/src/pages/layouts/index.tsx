import React from "react";
import { Link, Route } from 'react-router-dom';
import { List, Page, PageContent, PageHeader } from "grommet";
import { RoutedAnchor } from '../../components';
import { Collection, EmptyState } from './kinds';

const layouts = ['Collection', 'Dashboard', 'Detail', 'Empty state', 'Form', 'Home', 'List', 'Login', 'Main', 'NotFound', 'Settings', 'Splash', 'Wizard'];

const Layouts = () => {
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
  <Route key="collection" path="/layouts/collection" element={<Collection />} />,
  <Route key="dashboard" path="/layouts/dashboard" element={<div>Dashboard</div>} />,
  <Route key="empty-state" path="/layouts/empty-state" element={<EmptyState />} />,
]

export { Layouts, routes };
