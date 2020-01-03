import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grommet, Main, ResponsiveContext } from 'grommet';

import { aries } from '../../themes/aries';
import { Header, Head, SidebarLayout } from '..';

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
    <Grommet theme={aries} full>
      <ResponsiveContext.Consumer>
        {size => (
          <Box
            // pad={{ horizontal: calcPad(size) }}
            width={{ max: 'xxlarge' }}
            margin="auto"
          >
            <Head title={title} />
            <Header
              showLinks={!isLanding && !isNavPage}
              background={
                descriptiveHeader && descriptiveHeader.props.background
              }
            />
            {!isLanding && !isNavPage ? (
              <SidebarLayout mainContentChildren={children} />
            ) : (
              <Main>
                {/* Allows DescriptiveHeader background color not to be confined
                 * by formatting restrictions of page content
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
