import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React, { useEffect, createContext, useState } from 'react';
import { Layout, ThemeMode } from '../layouts';
import { components } from '../components';
import pageVisitTracker from '../utils/pageVisitTracker';

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

export const ViewContext = createContext(undefined);

function App({ Component, pageProps, router }) {
  const route = router.route.split('/');

  //state that holds the update information within the last 30 days
  const [contentHistory, setContentHistory] = useState({});
  //state that holds boolean for whether or not update info is ready to be rendered
  const [pageUpdateReady, setPageUpdateReady] = useState(false);

  //this effect is only for the first time a page loads
  useEffect(() => {
    let name = router.asPath;
    let nameArray = name.split('/');
    name = nameArray[Object.keys(nameArray).length - 1];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.split('#')[0];
    name = name.split('?')[0];

    //imported and put fetchData in here so that it can access the contentHistory function
    //thirtyDaysAgo calculated in milliseconds
    let thirtyDaysAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
    fetch(
      `https://api.github.com/repos/grommet/hpe-design-system/pulls?state=closed`,
    )
      .then(response => response.json())
      .then(data => {
        let nextHistory = {};
        let localStorageKey;
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (new Date(data[i].merged_at).getTime() < thirtyDaysAgo) {
            //if it is older than thirty days ago
            break;
          }
          let prDescription = data[i].body;
          if (prDescription.includes('#### Notifications')) {
            const indexOfFirstComponent =
              prDescription.search('#### Notifications') + 22;
            //the position of the first bracket containing either new/updates is 22 characters away
            //this includes the notification header and the \r\n\r\n that follow
            const notificationList = prDescription
              .slice(indexOfFirstComponent)
              .split('\r\n\r\n');
            //splits them into an array jumping between name, sections, and description
            //like: ['[New]Header', ['Usage', 'Some Section'], '[The description for header]', '[Update]Button', ['Dos and Donts'], '[Description for button]']
            const regExp = /\[([^)]+)\]/;
            for (let j = 0; j < Object.keys(notificationList).length; j += 3) {
              //+= 3 so it can jump between component descriptions
              let typeChangeAndName = notificationList[j].trim();
              let typeChange = regExp.exec(typeChangeAndName)[1].trim();
              let pageName;
              if (typeChange === 'Update') {
                pageName = typeChangeAndName.slice('8').trim();
              } else if (typeChange === 'New') {
                pageName = typeChangeAndName.slice('5').trim();
              }
              if (pageName && !(pageName in nextHistory)) {
                let sectionArray = notificationList[j + 1]
                  .slice(1, -1)
                  .split('][');
                //to ensure there is proper capitlization for the section headers
                for (let i = 0; i < Object.keys(sectionArray).length; i++) {
                  sectionArray[i] =
                    sectionArray[i].charAt(0).toUpperCase() +
                    sectionArray[i].slice(1).toLowerCase();
                }

                let anchorLink = '';
                if (Object.keys(sectionArray).length === 1) {
                  //add an active link if only one section has been updated
                  anchorLink =
                    '#' +
                    sectionArray[0].trim().replace(/\s+/g, '-').toLowerCase();
                }

                let newUpdate;
                localStorageKey = `${pageName
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}-last-visited`;
                if (window.localStorage.getItem(localStorageKey)) {
                  newUpdate =
                    window.localStorage.getItem(localStorageKey) >
                    new Date(data[i].merged_at).getTime()
                      ? false //if the last visit is more recent than the reported update, dont show it
                      : true;
                } else {
                  //have never visited the page before
                  newUpdate = true;
                }
                nextHistory[pageName] = {
                  changeKind: typeChange,
                  description: notificationList[j + 2].slice(1, -1),
                  date: data[i].merged_at,
                  sections: sectionArray,
                  action: anchorLink,
                  update: newUpdate,
                };
              }
            }
          }
        }
        window.localStorage.setItem(
          'update-history',
          JSON.stringify(nextHistory),
        );
        setContentHistory(nextHistory);
        setPageUpdateReady(true);
        if (name) {
          let localStorageKey = `${name
            ?.toLowerCase()
            .replace(/\s+/g, '-')}-last-visited`;
          let dateNow = new Date().getTime();
          window.localStorage.setItem(localStorageKey, dateNow);
        }
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      const skipLinks = document.querySelector('#skip-links');
      skipLinks.focus();

      if (typeof window !== 'undefined') {
        let viewHistory = JSON.parse(
          window.localStorage.getItem('update-history'),
        );
        let name = router.asPath;
        let nameArray = name.split('/');
        name = nameArray[Object.keys(nameArray).length - 1];
        name = name.charAt(0).toUpperCase() + name.slice(1);

        //to cover cases where they navigate via the search function
        let pageName = name.split('?')[0];
        let localStorageKey = `${pageName
          ?.toLowerCase()
          .replace(/\s+/g, '-')}-last-visited`;
        const dateTime = new Date().getTime();

        //every time it re-routes, see if the given page has a reported update in the last 30 days (what's reported in viewHistory)
        //then check if it should be shown (T/F), and set that in local storage and the state variable
        if (viewHistory && pageName in viewHistory) {
          viewHistory[pageName].update = pageVisitTracker(pageName);
          window.localStorage.setItem(
            'update-history',
            JSON.stringify(viewHistory),
          );
          window.localStorage.setItem(localStorageKey, dateTime);
          setContentHistory(viewHistory);
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
      <ViewContext.Provider
        value={{ contentHistory, pageUpdateReady, setPageUpdateReady }}
      >
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
