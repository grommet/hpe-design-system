import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import { AnchorGroup, Nav } from 'aries-core';

import { aries } from '../../themes/aries';
import { SideBar, SideBarItemList } from '../navigation';

const filterChildren = (children, type) => {
  const filteredChildren = React.Children.map(children, child => {
    return child.props[type] ? child : null;
  });

  if (filteredChildren.length > 1) {
    console.warn(
      `Expected a single ${type}, received ${filteredChildren.length}.`,
      `Only first ${type} element will be rendered.`,
    );
  }

  return filteredChildren;
};

export const Layout = ({ children, title }) => {
  // Only expect a single child of the following types
  const mainContent = filterChildren(children, 'MainContent');

  // Set-up routing variables to be given to nav/sidebar
  const router = useRouter();
  const selectedNavItem = router.pathname.split('/')[1];

  return (
    <Grommet theme={aries} full>
      <ResponsiveContext.Consumer>
        {size => (
          <>
            <Head>
              <link rel="icon" href="/static/favicon.ico" />
              <title>
                {title ? `${title} — Aries` : 'Aries | HPE Design System'}
              </title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
              />
            </Head>
            <Nav title="Aries" href="/start/about">
              <AnchorGroup
                items={[
                  { label: 'Start', href: '/start/about' },
                  { label: 'Foundation', href: '/foundation/primer' },
                  { label: 'Design', href: '/design/primer' },
                  { label: 'Develop', href: '/develop/code' },
                  { label: 'Resources', href: '/resources/examples' },
                ]}
                currentPath={router.pathname}
              />
            </Nav>
            <Box
              direction="row"
              // pad uses Nav pad from aries-core
              pad={{
                horizontal: size !== 'small' ? 'xlarge' : 'large',
                vertical: 'large',
              }}
            >
              {size !== 'small' && (
                <Box fill="vertical">
                  <SideBar
                    items={SideBarItemList[selectedNavItem]}
                    prefix={selectedNavItem}
                    activeItem={router.pathname}
                  />
                </Box>
              )}
              <Box flex>{mainContent[0]}</Box>
            </Box>
          </>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: undefined,
};
