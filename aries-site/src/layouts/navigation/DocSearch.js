import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { DocSearch } from '@docsearch/react';

const DocSearchHit = ({ children, hit }) => (
  <Link href={hit.as || ''} passHref>
    {children}
  </Link>
);

DocSearchHit.propTypes = {
  children: PropTypes.element,
  hit: PropTypes.shape({
    as: PropTypes.string,
  }),
};

const Search = () => {
  const router = useRouter();

  const keyboardNavigator = {
    navigate({ item }) {
      router?.push(item.as);
    },
  };

  return (
    <DocSearch
      appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
      indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME}
      apiKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY}
      transformItems={items => {
        return items.map(item => {
          // `url` contains the domain, parse so we can use next router
          // with DocSearchHit
          const parseUrl = document.createElement('a');
          parseUrl.href = item.url;

          return {
            ...item,
            as: `${parseUrl.pathname}${
              // TO DO need to find out why this is incorrectly
              // getting appended to page titles
              parseUrl.hash !== '#hpe-global-header' ? parseUrl.hash : ''
            }`,
          };
        });
      }}
      hitComponent={DocSearchHit}
      navigator={keyboardNavigator}
    />
  );
};

export { Search as DocSearch };
