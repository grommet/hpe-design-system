import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React, { useEffect, createContext, useState, useMemo } from 'react';
import { Layout, ThemeMode } from '../layouts';
import { components } from '../components';
import {
  pageVisitTracker,
  getLocalStorageKey,
} from '../utils/pageVisitTracker';
import { nameToSlug, getPageDetails } from '../utils';

const slugToText = str => str.split('-').join(' ');

const backgroundImages = {
  // components: {
  //   src: {
  //     dark: '/components-dark.svg',
  //     light: '/components-light.svg',
  //   },
  //   alt: 'HPE Design System Components',
  //   fit: 'contain',
  //   margin: { top: '-200px', left: '-75px' },
  //   small: {
  //     margin: { top: '-250px' },
  //   },
  // },
  // foundation: {
  //   src: {
  //     dark: '/foundation-dark.svg',
  //     light: '/foundation-light.svg',
  //   },
  //   alt: 'HPE Design System Foundation',
  //   margin: { left: '-280px', top: '-175px' },
  //   small: {
  //     margin: { left: '0', top: '-300px' },
  //   },
  // },
  // templates: {
  //   src: {
  //     dark: '/templates-dark.svg',
  //     light: '/templates-light.svg',
  //   },
  //   alt: 'HPE Design System Templates',
  //   margin: { left: '-300px', top: '-125px' },
  //   small: {
  //     margin: { left: '-25px', top: '-175px' },
  //   },
  // },
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

export const ViewContext = createContext(undefined);

// thirtyDaysAgo calculated in milliseconds
const thirtyDaysAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
const notificationHeading = '#### Notifications\r\n';

function App({ Component, pageProps, router }) {
  const route = router.route.split('/');

  // state that holds the update information within the last 30 days
  const [contentHistory, setContentHistory] = useState({});
  // state that holds boolean for whether or not
  // update info is ready to be rendered
  const [pageUpdateReady, setPageUpdateReady] = useState(false);

  // this effect is only for the first time _app mounts
  useEffect(() => {
    const routeParts = router.route.split('/');
    let name = routeParts[routeParts.length - 1].split('#')[0];
    name = name.charAt(0).toUpperCase() + name.slice(1);

    fetch(
      'https://api.github.com/repos/grommet/hpe-design-system/pulls?state=closed',
    )
      .then(response => response.json())
      .then(data => {
        const nextHistory = {};
        let localStorageKey;

        for (let i = 0; i < data.length; i += 1) {
          const prDescription = data[i].body;
          const mergedAt = data[i].merged_at;
          // PR was merged within the last 30 days and a notification
          // is flagged in the PR descrription
          if (
            new Date(mergedAt).getTime() > thirtyDaysAgo &&
            prDescription &&
            prDescription.includes(notificationHeading)
          ) {
            const indexOfFirstComponent =
              prDescription.search(notificationHeading) +
              notificationHeading.length;
            // the position of the first bracket containing
            // either new/updates is 22 characters away
            // this includes the notification header
            // and the \r\n\r\n that follow
            const notificationsParts = prDescription
              .slice(indexOfFirstComponent)
              // splits them into an array jumping between name,
              // sections, and description like: ['[New]Header', ['Usage',
              // 'Some Section'], '[The description for header]',
              // '[Update]Button', ['Dos and Donts'], '[Description
              // for button]']
              .split('\r\n\r\n');

            const regExp = /\[([^)]+)\]/;
            // += 3 so it can jump between component descriptions
            for (
              let j = 0;
              j < Object.keys(notificationsParts).length;
              j += 3
            ) {
              // changeKindAndName is in format: [Update]Button or [New]Button
              // where Button is the page name
              const changeKindAndName = notificationsParts[j].trim();
              const changeKind = regExp.exec(changeKindAndName)[0];

              // removes the [Update] or [New]
              const pageName =
                changeKindAndName &&
                // [Update]
                changeKind &&
                changeKindAndName.slice(changeKind.length).trim();

              if (pageName && !(pageName in nextHistory)) {
                const sections = notificationsParts[j + 1]
                  .slice(1, -1)
                  .split('][');

                let href;
                if (sections.length === 1) {
                  // add an active link if only one section has been updated
                  href = `#${nameToSlug(sections[0].trim())}`;
                }

                let showUpdate;
                localStorageKey = getLocalStorageKey(pageName);
                if (window.localStorage.getItem(localStorageKey)) {
                  showUpdate =
                    window.localStorage.getItem(localStorageKey) <
                    new Date(mergedAt).getTime();
                } else {
                  // user has never visited the page before
                  showUpdate = true;
                }
                nextHistory[pageName] = {
                  changeKind: regExp.exec(changeKindAndName)[1].trim(),
                  description: notificationsParts[j + 2].slice(1, -1),
                  date: mergedAt,
                  sections,
                  action: href,
                  update: showUpdate,
                };
              }
            }
          }
        }
        setContentHistory(nextHistory);
        // set page status as ready since all calculations are complete now
        setPageUpdateReady(true);
        if (name) {
          localStorageKey = getLocalStorageKey(name);
          const dateNow = new Date().getTime();
          window.localStorage.setItem(localStorageKey, dateNow);
        }
      })
      .catch(error => console.error(error));
  }, [router]);

  useEffect(() => {
    const handleRouteChange = () => {
      const skipLinks = document.querySelector('#skip-links');
      skipLinks.focus();

      if (typeof window !== 'undefined') {
        const routeParts = router.route.split('/');
        let name = routeParts[routeParts.length - 1].split('-').join(' ');
        const { name: pageName } = getPageDetails(name);
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const localStorageKey = getLocalStorageKey(name);
        const now = new Date().getTime();
        // every time it re-routes, see if the given page has a
        // reported update in the last 30 days (what's reported in
        // updateHistory) then check if it should be shown (T/F), and
        // set that in the state variable
        if (contentHistory && pageName in contentHistory) {
          contentHistory[pageName].update = pageVisitTracker(
            pageName,
            contentHistory,
          );
          window.localStorage.setItem(localStorageKey, now);
          setContentHistory(contentHistory);
          setPageUpdateReady(true);
        }
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, contentHistory, router.route]);

  // final array item from the route is the title of page we are on
  const title =
    route[route.length - 1].length && slugToText(route[route.length - 1]);

  // second to last array item (if present) is the topic
  const topic =
    route[route.length - 2] &&
    route[route.length - 2].length &&
    slugToText(route[route.length - 2]);

  const viewContextValue = useMemo(() => {
    return { contentHistory, pageUpdateReady, setPageUpdateReady };
  }, [contentHistory, pageUpdateReady]);

  return (
    <ThemeMode>
      <ViewContext.Provider value={viewContextValue}>
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
      </ViewContext.Provider>
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
