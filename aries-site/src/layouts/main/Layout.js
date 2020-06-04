import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import { Box, Main, ResponsiveContext, Stack } from 'grommet';
import { Header, Head, FeedbackSection, Footer } from '..';
import { PageBackground } from '../../components';
import { Config } from '../../../config';

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

export const Layout = ({ backgroundImage, children, title, isLanding }) => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  return (
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
              <Header />
              <Main overflow="visible">
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
  );
};

Layout.propTypes = {
  backgroundImage: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  isLanding: PropTypes.bool,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: undefined,
  isLanding: false,
};
