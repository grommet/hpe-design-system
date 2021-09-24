import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Keyboard,
  List,
  ResponsiveContext,
  Pagination,
  Text,
} from 'grommet';
import { FormClose } from 'grommet-icons';

import { SearchInput, SearchResult } from '.';

const defaultPage = { begin: 0, end: 4 };
const step = defaultPage.end - defaultPage.begin;

export const SearchResults = ({
  allSuggestions,
  onChange,
  onClose,
  onEnter,
  onSelect,
  query,
  results,
  setSuggestions,
  ...rest
}) => {
  const size = useContext(ResponsiveContext);
  const searchRef = useRef();
  const [page, setPage] = useState(defaultPage);
  /* Subset of results to display */

  const [paginatedResults, setPaginatedResults] = useState(
    results.slice(page.begin, page.end),
  );
  /* Mark where 'tag match' results begin */
  const [relatedBeginIndex, setRelatedBeginIndex] = useState(null);

  useEffect(() => {
    setPaginatedResults(results.slice(page.begin, page.end));
  }, [results, page]);

  /* Determine at which index related results begin */
  useEffect(() => {
    let nextBeginIndex = null;
    paginatedResults.forEach((result, index) => {
      if (
        (nextBeginIndex === null || index < nextBeginIndex) &&
        result.value.matchLocation &&
        result.value.matchLocation.toString() === 'Tags'
      ) {
        nextBeginIndex = index;
      }
      setRelatedBeginIndex(nextBeginIndex);
    });
  }, [relatedBeginIndex, page, paginatedResults]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchRef]);

  useEffect(() => {
    setPage(defaultPage);
  }, [query]);

  // useEffect(() => {
  //   console.log(paginatedResults);
  // }, [paginatedResults]);

  const matches = paginatedResults.filter(result =>
    result.value.matchLocation
      ? result.value.matchLocation.includes('Title')
      : result,
  );

  const similarMatches = paginatedResults.filter(
    result =>
      result.value.matchLocation && result.value.matchLocation.includes('Tags'),
  );

  return (
    <Box
      background="background-front"
      round="small"
      pad={{ horizontal: 'medium', top: 'small', bottom: 'large' }}
      gap="small"
      width="large"
      fill
      {...rest}
    >
      <Button icon={<FormClose />} onClick={onClose} alignSelf="end" />
      <Box
        background="background-contrast"
        flex={false}
        round="xsmall"
        margin={{ horizontal: 'small' }}
      >
        <Keyboard onEsc={onClose} onEnter={onEnter}>
          <SearchInput
            ref={searchRef}
            placeholder="Search the HPE Design System"
            value={query}
            onChange={onChange}
            size={size !== 'small' ? 'xlarge' : 'medium'}
          />
        </Keyboard>
      </Box>
      <Box overflow="auto" pad="xsmall">
        {matches.length > 0 && (
          <List
            data={matches}
            onClickItem={onSelect}
            border={{ side: 'bottom', color: 'border-weak' }}
          >
            {datum => <SearchResult query={query} result={datum.value} />}
          </List>
        )}
        {similarMatches.length > 0 && (
          <Box flex={false}>
            <Box
              gap="xsmall"
              pad={{ horizontal: 'medium', top: 'large', bottom: 'medium' }}
            >
              <Text
                color="text-strong"
                size={size !== 'small' ? 'xlarge' : 'large'}
                weight="bold"
              >
                Similar to '{query}'
              </Text>
              <Text size={size !== 'small' ? 'large' : 'medium'}>
                You may also be interested in this related content:
              </Text>
            </Box>
            <List
              data={similarMatches}
              onClickItem={onSelect}
              border={{ side: 'bottom', color: 'border-weak' }}
            >
              {datum => <SearchResult query={query} result={datum.value} />}
            </List>{' '}
          </Box>
        )}
        {results.length === 0 && (
          <SearchResult
            query={query}
            result={{
              title: `No results found for "${query}".`,
              description: `Try using an alternate phrasing, synonym, 
              or reducing your search term to its stem by removing extensions
              such as "ing", "ed", "s", etc. Alternatively, reach out 
              on Slack at #hpe-design-system channel and a team member will 
              be happy to assist.`,
            }}
          />
        )}
      </Box>
      <Pagination
        alignSelf={size === 'small' ? 'center' : 'end'}
        numberItems={results.length}
        page={Math.floor(page.end / step)}
        onChange={({ startIndex, endIndex }) => {
          setPage({ begin: startIndex, end: endIndex });
        }}
        step={step}
      />
    </Box>
  );
};

SearchResults.propTypes = {
  allSuggestions: PropTypes.array,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  onEnter: PropTypes.func,
  onSelect: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      query: PropTypes.string,
      matchedText: PropTypes.string,
      matchType: PropTypes.string,
      url: PropTypes.string,
      preview: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    }),
  ),
  setSuggestions: PropTypes.func,
};
