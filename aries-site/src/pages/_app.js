import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Layout, ThemeMode } from '../layouts';
import { components } from '../components';
import pageVisitTracker from '../utils/pageVisitTracker';
import { createContext } from 'react';
import { useState } from 'react';

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
  const [wholeViewHistory, setWholeViewHistory] = useState({});
  const [changeLog, setChangeLog] = useState({});
  //state that holds boolean for whether or not update info is ready to be rendered
  const [pageUpdateReady, setPageUpdateReady] = useState(false);

  //this effect is only for the first time a page loads
  useEffect(() => {
    let name = router.asPath;
    let nameArray = name.split('/');
    name = nameArray[Object.keys(nameArray).length - 1];
    name = name.charAt(0).toUpperCase() + name.slice(1);
    name = name.split('#')[0];

    //imported and put fetchData in here so that it can access the setWholeViewHistory function
    let thirtyDaysAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
    let threeMonthsAgo = new Date().getTime() - 90 * 24 * 60 * 60 * 1000;

    fetch(
      `https://api.github.com/repos/grommet/hpe-design-system/pulls?state=closed&per_page=100`,
    )
      .then(response => response.json())
      .then(data => {
        let tempHistory = {};
        let tempLog = {};
        let tokenName;
        for (let i = 0; i < Object.keys(data).length; i++) {
          if (new Date(data[i].merged_at).getTime() < threeMonthsAgo) {
            //if it is older than three months days ago
            break;
          }
          let tempString = data[i].body;
          if (tempString.includes('#### Notifications')) {
            const indexOfFirstComponent =
              tempString.search('#### Notifications') + 22;
            const notifSection = tempString.slice(indexOfFirstComponent);
            const notifList = notifSection.split('\r\n\r\n'); //splits them into an array jumping b/w name, sections, and description
            const regExp = /\[([^)]+)\]/;
            for (let j = 0; j < Object.keys(notifList).length; j += 3) {
              let tempName = notifList[j].trim();
              let temp = regExp.exec(tempName);
              let typeChange = temp[1].trim();
              let justName, tempDescription;
              if (typeChange === 'Update') {
                justName = tempName.slice('8').trim();
              } else if (typeChange === 'New') {
                justName = tempName.slice('5').trim();
              }
              if (notifList[j + 2].slice(1, -1) === '') {
                tempDescription = justName + ' was added.';
              } else {
                tempDescription = notifList[j + 2].slice(1, -1);
              }
              if (
                !(justName in tempHistory) &&
                new Date(data[i].merged_at).getTime() > thirtyDaysAgo
              ) {
                let sectionArray = notifList[j + 1].slice(1, -1).split('][');
                let finalSectionlist = [];
                let action = '';
                if (Object.keys(sectionArray).length === 1) {
                  //add an active link if only one section has been updated
                  action =
                    '#' +
                    sectionArray[0].trim().replace(/\s+/g, '-').toLowerCase();
                }
                for (let i = 0; i < Object.keys(sectionArray).length; i++) {
                  finalSectionlist[i] =
                    sectionArray[i].charAt(0).toUpperCase() +
                    sectionArray[i].slice(1).toLowerCase();
                }
                let newUpdate;
                tokenName = `${justName
                  ?.toLowerCase()
                  .replace(/\s+/g, '-')}-last-visited`;
                if (window.localStorage.getItem(tokenName)) {
                  if (
                    window.localStorage.getItem(tokenName) >
                    new Date(data[i].merged_at).getTime()
                  ) {
                    //history of them visiting the page before, and that visit was after the newest update was sent
                    newUpdate = false;
                  } else {
                    //history of them visiting the page before, but that visit was before the newest update was sent
                    newUpdate = true;
                  }
                } else {
                  //have never seen the page before
                  newUpdate = true;
                }
                tempHistory[justName] = {
                  type: typeChange,
                  description: tempDescription,
                  date: data[i].merged_at,
                  sections: sectionArray,
                  action: action,
                  update: newUpdate,
                };
                tempLog[justName] = [
                  {
                    date: new Date(data[i].merged_at)
                      .toDateString()
                      .split(' ')
                      .slice(1)
                      .join(' '),
                    description: tempDescription,
                  },
                ];
              } else {
                //the case where it's not the components newest update and/or it more than 30 days ago
                if (tempLog[justName]) {
                  tempLog[justName].push({
                    date: new Date(data[i].merged_at)
                      .toDateString()
                      .split(' ')
                      .slice(1)
                      .join(' '),
                    description: tempDescription,
                  });
                } else {
                  tempLog[justName] = [
                    {
                      date: new Date(data[i].merged_at)
                        .toDateString()
                        .split(' ')
                        .slice(1)
                        .join(' '),
                      description: tempDescription,
                    },
                  ];
                }
              }
            }
          }
        }
        window.localStorage.setItem(
          'update-history',
          JSON.stringify(tempHistory),
        );
        setWholeViewHistory(tempHistory);
        setChangeLog(tempLog);
        setPageUpdateReady(true);
      })
      .then(() => {
        if (name) {
          let tokenName = `${name
            ?.toLowerCase()
            .replace(/\s+/g, '-')}-last-visited`;
          let dateNow = new Date().getTime();
          window.localStorage.setItem(tokenName, dateNow);
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
        let tokenName = `${name
          ?.toLowerCase()
          .replace(/\s+/g, '-')}-last-visited`;
        let dateTime = new Date().getTime();

        //every time it re-routes, see if the given page has a reported update in the last 30 days (what's reported in viewHistory)
        //then check if it should be shown (T/F), and set that in local storage and the state variable
        if (name in viewHistory) {
          viewHistory[name].update = pageVisitTracker(name);

          window.localStorage.setItem(
            'update-history',
            JSON.stringify(viewHistory),
          );
          window.localStorage.setItem(tokenName, dateTime);

          setWholeViewHistory(viewHistory);
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
        value={{
          wholeViewHistory,
          pageUpdateReady,
          setPageUpdateReady,
          changeLog,
        }}
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
