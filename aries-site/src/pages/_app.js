import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Layout, ThemeMode } from '../layouts';
import { components } from '../components';

const slugToText = str => str.split('-').join(' ');

/* _app.js allows for customizing Next.js's default <App> component
 * Details: https://nextjs.org/docs/advanced-features/custom-app
 *
 * The `Component` prop is the active `page`, so whenever you
 * navigate between routes, `Component` will change to the new `page`.
 */
function App({ Component, pageProps, router }) {
  const route = router.route.split('/');

  // final array item from the route is the title of page we are on
  const title =
    route[route.length - 1].length && slugToText(route[route.length - 1]);

  // second to last array item (if present) is the topic
  const topic =
    route[route.length - 2] &&
    route[route.length - 2].length &&
    slugToText(route[route.length - 2]);

  // for mdx pages, we need to wrap the content in Layout and MDX provider
  if (Component.isMDXComponent) {
    return (
      <ThemeMode>
        <Layout title={title} topic={topic}>
          <MDXProvider components={components}>
            <Component {...pageProps} />
          </MDXProvider>
        </Layout>
      </ThemeMode>
    );
  }

  // for all other pages, we build the page with Layout in the .js file
  return (
    <ThemeMode>
      <Component {...pageProps} />
    </ThemeMode>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
  router: PropTypes.shape({
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default App;
