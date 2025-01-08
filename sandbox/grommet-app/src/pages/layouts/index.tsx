import React from "react";
import { Link, Route } from 'react-router-dom';
import { Anchor, List, Page, PageContent, PageHeader } from "grommet";

interface RoutedAnchorProps extends React.ComponentProps<typeof Anchor> {
  to: string;
}

const RoutedAnchor = ({ ...rest }: RoutedAnchorProps) => (
  <Anchor {...rest} />
);

const layouts = ['Collection', 'Dashboard', 'Detail', 'Form', 'Home', 'List', 'Login', 'Main', 'NotFound', 'Settings', 'Splash', 'Wizard'];

const Layouts = () => {
  return (
    <Page pad={{ vertical: "large" }}>
      <PageContent>
        <PageHeader title="Layouts" />
        <List data={layouts} defaultItemProps={{ pad: { vertical: 'xxsmall' } }}>
          {(item) => (
            <RoutedAnchor key={item} as={Link} to={`/layouts/${item.toLowerCase()}`} label={item} />
          )}
        </List>
      </PageContent>
    </Page>
  );
};

const routes = [
  <Route path="/layouts/collection" element={<div>Collection</div>} />,
  <Route path="/layouts/dashboard" element={<div>Dashboard</div>} />
]

export { Layouts, routes };