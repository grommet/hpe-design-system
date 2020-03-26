import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { initialize, pageview } from 'react-ga';
import { Box, Main, ResponsiveContext } from 'grommet';
import { Header, Head, FeedbackSection, Footer, NextContent } from '..';
import { ThemeMode } from '../../components';
import { Config } from '../../../config';
import { getParentPage, getNextContent } from '../../utils';

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

export const Layout = ({
  children,
  descriptiveHeader,
  title,
  isLanding,
  isNavPage,
}) => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  // For NextContent
  const parentTopic = getParentPage(title);
  const { color } = typeof parentTopic !== 'undefined' ? parentTopic : {};
  const nextContent = getNextContent(title);

  return (
    <ThemeMode>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            height={{ min: '100vh' }}
            margin="auto"
            width={{ max: 'xxlarge' }}
          >
            <Head title={title} />
            <Header
              background={
                descriptiveHeader && descriptiveHeader.props.background
              }
            />
            <Main overflow="visible">
              {/* Allows DescriptiveHeader background color not to be
               * confined by formatting restrictions of page content
               */}
              {descriptiveHeader &&
                React.cloneElement(descriptiveHeader, {
                  pad: {
                    horizontal: calcPad(size),
                    bottom: calcPad(size),
                    top: 'xlarge',
                  },
                  round: { corner: 'bottom', size: 'medium' },
                })}
              {/* aligns with responsive padding for aries-core Nav */}
              <Box
                pad={{
                  horizontal: calcPad(size),
                  bottom: isLanding || isNavPage ? calcPad(size) : undefined,
                  top: 'medium',
                }}
              >
                {children}
                {!isLanding && !isNavPage && (
                  <>
                    <FeedbackSection />
                    <NextContent color={color} nextContent={nextContent} />
                  </>
                )}
              </Box>
            </Main>
            {isLanding && <Footer />}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </ThemeMode>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  descriptiveHeader: PropTypes.element,
  isLanding: PropTypes.bool,
  isNavPage: PropTypes.bool,
  title: PropTypes.string,
};

Layout.defaultProps = {
  descriptiveHeader: undefined,
  title: undefined,
  isLanding: false,
  isNavPage: false,
};
