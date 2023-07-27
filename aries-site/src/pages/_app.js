import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Layout, ThemeMode } from '../layouts';
import { components } from '../components';
import fetchData from '../layouts/content/fetchData';
import { createMemoryHistory } from 'history';

const slugToText = str => str.split('-').join(' ');

const backgroundImages = {
  components: {
    src: {
      dark: '/components-dark.svg',
      light: '/components-light.svg',
    },
    alt: 'HPE Design System Components',
    fit: 'contain',
    margin: { top: '-200px', left: '-75px' },
    small: {
      margin: { top: '-250px' },
    },
  },
  foundation: {
    src: {
      dark: '/foundation-dark.svg',
      light: '/foundation-light.svg',
    },
    alt: 'HPE Design System Foundation',
    margin: { left: '-280px', top: '-175px' },
    small: {
      margin: { left: '0', top: '-300px' },
    },
  },
  templates: {
    src: {
      dark: '/templates-dark.svg',
      light: '/templates-light.svg',
    },
    alt: 'HPE Design System Templates',
    margin: { left: '-300px', top: '-125px' },
    small: {
      margin: { left: '-25px', top: '-175px' },
    },
  },
  showmore: {
    src: { dark: '/cards-dark.svg', light: '/cards.svg' },
    alt: 'HPE Design System',
    margin: { top: '50px', left: '-150px' },
    style: { transform: 'scale(1.4)', transformOrigin: 'top left' },
    small: {
      margin: { left: '-75px', top: '-75px' },
    },
    useGrid: true,
  },
};


/* _app.js allows for customizing Next.js's default <App> component
 * Details: https://nextjs.org/docs/advanced-features/custom-app
 *
 * The `Component` prop is the active `page`, so whenever you
 * navigate between routes, `Component` will change to the new `page`.
 */
function App({ Component, pageProps, router }) {
  const route = router.route.split('/');

  useEffect(() => {
    fetchData();
  }, [])

  // let history = createMemoryHistory();
  // console.log(history.location);
  // history.listen(({ action, location }) => {
  //   console.log(
  //     `The current URL is ${location.pathname}${location.search}${location.hash}`
  //   );
  //   console.log(`The last navigation action was ${action}`);
  // });

  // necessary to ensure SkipLinks can receive first tab focus
  // after a route change
  useEffect(() => {
    const handleRouteChange = () => {
      const skipLinks = document.querySelector('#skip-links');
      skipLinks.focus();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // final array item from the route is the title of page we are on
  const title =
    route[route.length - 1].length && slugToText(route[route.length - 1]);

  // second to last array item (if present) is the topic
  const topic =
    route[route.length - 2] &&
    route[route.length - 2].length &&
    slugToText(route[route.length - 2]);
  return (
    <ThemeMode>
      <Layout
        title={title || ''}
        topic={topic}
        // What's new page is MDX
        isLanding={!topic && title !== 'whats new'}
        // applies card images to the "hub" pages
        backgroundImage={backgroundImages[title]}
      >
        <MDXProvider components={components}>
          <Component {...pageProps} />
        </MDXProvider>
      </Layout>
    </ThemeMode>
  );
}

App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
  router: PropTypes.shape({
    route: PropTypes.string.isRequired,
    events: PropTypes.shape({
      on: PropTypes.func,
      off: PropTypes.func,
    }),
  }).isRequired,
};

export default App;
