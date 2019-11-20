import React, { useContext } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import { hpe } from 'grommet-theme-hpe';

import { AnchorGroup, Nav } from 'aries-core';

const filterChildren = (children, type) => {
  const filteredChildren = React.Children.map(children, child => {
    return child.type.name === type ? child : null;
  });
  if (filteredChildren.length > 1) {
    console.warn(
      `Expected a single ${type}, received ${filteredChildren.length}.`,
      `Only first ${type} element will be rendered.`,
    );
  }
  return filteredChildren;
};

const Layout = ({ children }) => {
  // const mainContent = filterChildren(children, 'MainContent');
  const sidebar = filterChildren(children, 'SideBar');
  const size = useContext(ResponsiveContext);

  return (
    <Grommet theme={hpe} full>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
        <title>Aries | HPE Design System</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Nav title="Aries">
        <AnchorGroup
          items={[
            { label: 'Start', href: '/' },
            { label: 'Foundation', href: '/foundation' },
            { label: 'Design', href: '/design' },
            { label: 'Develop', href: '/develop' },
            { label: 'Resources', href: '/resources' },
          ]}
        />
      </Nav>
      <Box direction="row">
        {sidebar && (
          <Box background="light-1" fill="vertical">
            {children[0]}
          </Box>
        )}
        <Box flex pad={size !== 'small' ? { right: 'large' } : undefined}>
          {children[1]}
        </Box>
      </Box>
    </Grommet>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Layout;
