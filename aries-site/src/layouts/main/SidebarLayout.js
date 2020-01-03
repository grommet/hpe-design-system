import React from 'react';

import PropTypes from 'prop-types';
import { Box, Main, ResponsiveContext } from 'grommet';

import { SideBar, SideBarItemList } from '../navigation';
import { SubmitFeedback } from '../../components/content';

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

export const SidebarLayout = ({ mainContentChildren }) => {
  // Only expect a single child of the following types
  const mainContent = filterChildren(mainContentChildren, 'MainContent');

  // TODO selectedNav should be retrived from aries-core
  // as the selected element of the NavBar
  const selectedNav = 'foundation';

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Box
            direction="row"
            // pad uses Nav pad from aries-core
            pad={{
              horizontal: size !== 'small' ? 'xlarge' : 'large',
              vertical: 'large',
            }}
          >
            <Main flex>
              {mainContent[0]}
              <SubmitFeedback />
            </Main>
            {size !== 'small' && (
              <Box fill="vertical">
                <SideBar
                  items={SideBarItemList[selectedNav]}
                  prefix={selectedNav}
                />
              </Box>
            )}
          </Box>
        </>
      )}
    </ResponsiveContext.Consumer>
  );
};

SidebarLayout.propTypes = {
  mainContentChildren: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
  ]),
};
