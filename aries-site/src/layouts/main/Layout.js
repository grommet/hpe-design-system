import React from 'react';
import PropTypes from 'prop-types';
import { Grommet, Main, ResponsiveContext } from 'grommet';

import { aries } from '../../themes/aries';
import { Header, Head, SidebarLayout } from '..';

export const Layout = ({ children, title, isLanding }) => {
  return (
    <Grommet theme={aries} full>
      <ResponsiveContext.Consumer>
        {size => (
          <>
            <Head title={title} />
            <Header showLinks={!isLanding} />
            {!isLanding ? (
              <SidebarLayout mainContentChildren={children} />
            ) : (
              // aligns with responsive padding for aries-core Nav
              <Main pad={size !== 'small' ? 'xlarge' : 'large'}>
                {children}
              </Main>
            )}
          </>
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
