import React from 'react';
import PropTypes from 'prop-types';
import { ThemeMode } from '../layouts';
/* _app.js allows for customizing Next.js's default <App> component
 * Details: https://nextjs.org/docs/advanced-features/custom-app
 *
 * The `Component` prop is the active `page`, so whenever you
 * navigate between routes, `Component` will change to the new `page`.
 */
function App({ Component, pageProps }) {
  return (
    // need to wrap Component here so that
    // scroll position is correct when link
    // or search suggestion directs to a hash
    <ThemeMode>
      <Component {...pageProps} />
    </ThemeMode>
  );
}

App.propTypes = {
  Component: PropTypes.element,
  pageProps: PropTypes.object,
};

export default App;
