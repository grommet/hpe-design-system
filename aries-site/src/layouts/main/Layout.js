import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { initialize, pageview } from 'react-ga';
import { Box, Main, ResponsiveContext } from 'grommet';
import { Header, Head, FeedbackSection, Footer } from '..';
import { ThemeMode } from '../../components';
import { Config } from '../../../config';

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

export const Layout = ({ children, title, isLanding }) => {
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
          <Box
            height={{ min: '100vh' }}
            margin="auto"
            width={{ max: 'xxlarge' }}
          >
            <Head title={title} />
            <Header />
            <Main overflow="visible">
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
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </ThemeMode>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  isLanding: PropTypes.bool,
  title: PropTypes.string,
};

Layout.defaultProps = {
  title: undefined,
  isLanding: false,
};
