import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Grommet, ResponsiveContext } from 'grommet';
import { hpe } from 'grommet-theme-hpe';
import { AnchorGroup, Nav } from 'aries-core';
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

  // Set-up routing variables to be given to aries-core components
  const router = useRouter();

  // Selects the prefix path such as "/start" but ignores any secondary nav
  // information such as "/about"
  const prefixRegex = new RegExp(/^\/[a-z-]*/);
  const selectedNavItem = prefixRegex.exec(router.pathname)[0].substring(1);

  return (
    <Grommet theme={hpe} full>
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
                // We only want to see which main nav item is selected,
                // but don't care about which secondary nav item is selected
                activeHref={`/${selectedNavItem}`}
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
