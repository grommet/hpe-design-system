import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grommet, Main, ResponsiveContext } from 'grommet';

import { aries } from '../../themes/aries';
import { Header, Head, SidebarLayout } from '..';

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

export const Layout = ({ children, title, isLanding }) => {
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
            <Header showLinks={!isLanding} />
            {!isLanding ? (
              <SidebarLayout mainContentChildren={children} />
            ) : (
              // aligns with responsive padding for aries-core Nav
              <Main pad={{horizontal: calcPad(size), bottom: calcPad(size), top: "medium"}}>{children}</Main>
            )}
          </Box>
        )}
      </ResponsiveContext.Consumer>
    </Grommet>
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
