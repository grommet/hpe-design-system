import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { Box, Grommet } from 'grommet';
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
  const mainContent = filterChildren(children, 'MainContent');
  const sidebar = filterChildren(children, 'SideBar');

  return (
    <Grommet theme={hpe} full>
      <Head>
        <link rel="icon" href="/static/favicon.ico" />
      </Head>
      <Nav title="Aries">
        <AnchorGroup
          items={[
            { label: 'Start' },
            { label: 'Elements' },
            { label: 'Components' },
            { label: 'Layouts' },
            { label: 'Templates' },
          ]}
        />
      </Nav>
      <Box direction="row" fill>
        {sidebar && (
          <Box background="light-1" fill="vertical">
            {children[0]}
          </Box>
        )}
        <Box fill="vertical">{children[1]}</Box>
      </Box>
    </Grommet>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default Layout;
