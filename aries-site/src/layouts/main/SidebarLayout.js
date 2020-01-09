import React from 'react';

import PropTypes from 'prop-types';
import { Box, Main, ResponsiveContext } from 'grommet';

import { NextContent, SideBar } from '../navigation';
import { SubmitFeedback } from '../../components/content';
import { getNextContent, getParentPage } from '../../utils';

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

export const SidebarLayout = ({ mainContentChildren, title }) => {
  // Only expect a single child of the following types
  const mainContent = filterChildren(mainContentChildren, 'MainContent');

  // Get parent topic details
  const parentTopic = getParentPage(title);
  const { name, color, pages } = parentTopic;
  const nextContent = getNextContent(title);

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
              <Box
                fill="vertical"
                margin={{ top: 'xlarge' }}
                pad={{ top: 'large' }}
              >
                <SideBar items={pages} topic={name} />
              </Box>
            )}
          </Box>
          <NextContent color={color} nextContent={nextContent} />
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
  title: PropTypes.string,
};
