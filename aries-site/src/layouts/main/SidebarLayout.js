import React from 'react';

import PropTypes from 'prop-types';
import { Box, Main, ResponsiveContext } from 'grommet';

import { SideBar } from '../navigation';
import { SubmitFeedback } from '../../components/content';
import { structure } from '../../data';

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

export const SidebarLayout = ({ mainContentChildren, topic }) => {
  // Only expect a single child of the following types
  const mainContent = filterChildren(mainContentChildren, 'MainContent');
  const topicPages = structure.find(page => page.name === topic).pages;

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
                <SideBar items={topicPages} topic={topic} />
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
  topic: PropTypes.string,
};

SidebarLayout.defaultProps = {
  topic: 'Foundation',
};
