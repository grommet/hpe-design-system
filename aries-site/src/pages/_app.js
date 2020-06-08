import { MDXProvider } from '@mdx-js/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Layout, ThemeMode } from '../layouts';
import { components } from '../components';

const capitalizeFLetter = word => {
  return word.replace(/^./, word[0].toUpperCase());
};

const formatString = str => {
  const formattedString = [];
  const splitString = str.split('-');
  splitString.forEach(s => formattedString.push(capitalizeFLetter(s)));
  return formattedString.join(' ');
};

function MyApp({ Component, pageProps, router }) {
  const route = router.route.split('/');
  // final array item is the title of page we are on
  const title =
    route[route.length - 1].length && formatString(route[route.length - 1]);

  // second to last array item is the topic
  const topic =
    route[route.length - 2] &&
    route[route.length - 2].length &&
    formatString(route[route.length - 2]);

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

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.shape({}),
  router: PropTypes.shape({
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default MyApp;
