import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import { Box, Grommet, Main, ResponsiveContext } from 'grommet';

import { aries } from '../../themes/aries';
import { Header, Head, Footer, SidebarLayout } from '..';
import { Config } from '../../../config';

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

  return (
    <Grommet theme={aries} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            // pad={{ horizontal: calcPad(size) }}
            height={{ min: '100vh' }}
            margin="auto"
            width={{ max: 'xxlarge' }}
          >
            <Head title={title} />
            <Header
              showLinks={!isLanding && !isNavPage}
              background={
                descriptiveHeader && descriptiveHeader.props.background
              }
            />
            {!isLanding && !isNavPage ? (
              <SidebarLayout title={title}> {children} </SidebarLayout>
            ) : (
              <Main>
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
                </Box>
              </Main>
            )}
            {isLanding && <Footer />}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
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
