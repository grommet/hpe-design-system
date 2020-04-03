import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import { Box, Main, ResponsiveContext, Stack } from 'grommet';
import { Header, Head, FeedbackSection, Footer } from '..';
import { PageBackground, ThemeMode } from '../../components';
import { Config } from '../../../config';

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

export const Layout = ({
  backgroundImage,
  children,
  descriptiveHeader,
  title,
  isLanding,
}) => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  return (
    <ThemeMode>
      <ResponsiveContext.Consumer>
        {size => (
          // When a backgroundImage is present, the main page content becomes
          // the `last` child. We want this content to drive the layout.
          // For details on this prop, see here: https://v2.grommet.io/stack#guidingChild
          <Stack fill guidingChild={backgroundImage && 'last'}>
            {backgroundImage && (
              <PageBackground backgroundImage={backgroundImage} />
            )}
            <Box
              height={{ min: '100vh' }}
              margin="auto"
              width={{ max: 'xxlarge' }}
            >
              <Head title={title} />
              <>
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
                      bottom: calcPad(size),
                      top: 'medium',
                    }}
                  >
                    {children}
                    {!isLanding && <FeedbackSection />}
                  </Box>
                </Main>
                <Footer />
              </>
            </Box>
          </Stack>
        )}
      </ResponsiveContext.Consumer>
    </ThemeMode>
  );
};

Layout.propTypes = {
  backgroundImage: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  descriptiveHeader: PropTypes.element,
  isLanding: PropTypes.bool,
  title: PropTypes.string,
};

Layout.defaultProps = {
  descriptiveHeader: undefined,
  title: undefined,
  isLanding: false,
};
