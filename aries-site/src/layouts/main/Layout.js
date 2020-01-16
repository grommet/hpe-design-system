import React from 'react';
import PropTypes from 'prop-types';
import { Box, Main, ResponsiveContext } from 'grommet';
import { Header, Head, Footer, SidebarLayout } from '..';
import { ThemeMode, ThemeModeToggle } from '../../components';

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
  return (
    <ThemeMode>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            // pad={{ horizontal: calcPad(size) }}
            height={{ min: '100vh' }}
            margin="auto"
            width={{ max: 'xxlarge' }}
          >
            <Head title={title} />
            {/* Temporary placement of theme toggle from Chris.
             * Will likely be updated in future, but wanted visible
             * placement for demo. */}
            <Box
              style={{
                position: 'absolute',
                bottom: size !== 'small' ? '48px' : '24px',
                right: '24px',
              }}
            >
              <ThemeModeToggle />
            </Box>
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
