import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Layer, ResponsiveContext } from 'grommet';
import { getSearchSuggestions, nameToPath } from '../../utils';
import { internalLink } from '../../components';
import { SearchResult, SearchResults } from '.';
import { siteContents } from '../../data/search/contentForSearch';

const allSuggestions = getSearchSuggestions
  .filter(item => item.value.searchable || item.value.searchable === undefined)
  .map(page => {
    const { label, value } = page;
    const match = siteContents.find(item => item.name === value.name);
    if (match) {
      const { parent, path, content } = match;
      return {
        label,
        value: {
          ...value,
          parent,
          path,
          content,
        },
      };
    }
    return page;
  });

/*
 * Construct an object where 'label' is the displayed element and
 * 'value' contains all data related to the content/result.
 */
const formatSearchResults = (query, results) =>
  results &&
  results.map(result => {
    const nextValue = {
      ...result.value,
      url: nameToPath(result.value.title),
    };

    return {
      label: <SearchResult query={query} result={nextValue} />,
      value: nextValue,
    };
  });

/* Sort search results by relevancy and/or strength of match type */
const sortSearch = matches => {
  const results = matches
    /* Priortize content matches by density (i.e. number of matches per page) */
    .sort((a, b) => {
      const aMatches = a.value.matches;
      const bMatches = b.value.matches;
      if (aMatches.length > 0 && bMatches.length > 0) {
        return bMatches.length - aMatches.length;
      }
      return bMatches.length - aMatches.length;
    })
    /* Prioritize title matches, then content matches over metadata matches */
    .sort((a, b) => {
      const ruleOrder = {
        Title: 0,
        Content: 1,
        Tags: 2,
      };
      return (
        ruleOrder[a.value.matchLocation] - ruleOrder[b.value.matchLocation]
      );
    })
    .reduce((acc, cur) => {
      /* Include all title matches */
      if (cur.value.matchLocation.includes('Title')) {
        acc.push(cur);
      }
      /* Include all content matches */
      if (cur.value.matchLocation.includes('Content')) {
        acc.push(cur);
      }
      /* Only add tag match if the page does not have a title match */
      if (
        cur.value.matchLocation.includes('Tags') &&
        !acc.find(element => element.value.name === cur.value.name)
      ) {
        acc.push(cur);
      }
      return acc;
    }, []);

  return results;
};

const exactMatch = (data, query) => {
  const regexp = new RegExp(query, 'i');
  const results = data.map(option => {
    const { value: valueObj } = option;
    const { content, tags, title } = valueObj;
    const nextOption = {
      ...option,
      value: { ...valueObj, matchType: [], matchLocation: [], matches: [] },
    };

    if (regexp.test(title)) {
      /* Title Match */
      nextOption.value.matchType.push('ExactMatch');
      nextOption.value.matchLocation.push('Title');
    }
    /* Content Match */
    // TODO: number of matches should affect weighting
    else if (content && regexp.test(content)) {
      const matchAll = new RegExp(query, 'gi');
      const matches = [...content.matchAll(matchAll)];
      const adjMatches = matches.map(match => ({
        ...match,
        preview: `... ${match.input.substring(
          Math.max(match.index - 40, 0),
          match.index + 180,
        )} ...`,
      }));
      nextOption.value.matchType.push('ExactMatch');
      nextOption.value.matchLocation.push('Content');
      nextOption.value.matches = adjMatches;
    } else if (regexp.test(tags)) {
      /* Metadata: Tag Match */
      nextOption.value.matchType.push('ExactMatch');
      nextOption.value.matchLocation.push('Tags');
    }

    return nextOption;
  });

  return results;
};

const search = (data, query) => {
  const results = exactMatch(data, query).filter(
    option => option.value.matchType.length > 0,
  );

  return sortSearch(results);
};

export const Search = ({ setOpen }) => {
  const router = useRouter();
  const size = useContext(ResponsiveContext);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(
    formatSearchResults(null, allSuggestions),
  );

  const onClose = () => {
    setOpen(false);
  };

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    let nextSuggestions;
    if (nextValue.length) {
      nextSuggestions = search(allSuggestions, nextValue);
    } else {
      nextSuggestions = allSuggestions;
    }

    setSuggestions(
      formatSearchResults(
        nextValue.length > 0 ? nextValue : null,
        nextSuggestions,
      ),
    );
    setValue(nextValue);
  };

  const onEnter = () => {
    if (value) {
      if (suggestions.length === 1) {
        router.push({
          pathname: nameToPath(suggestions[0].value.title),
          query: `q=${value}`,
        });
        onClose();
      } else {
        // TODO: Revisit this case and matching scenario
        const matches = allSuggestions.filter(
          c => c.label.toLowerCase() === value.toLowerCase(),
        );
        if (matches.length === 1) {
          router.push({
            pathname: nameToPath(matches[0].value.title),
            query: `q=${value}`,
          });
          onClose();
        }
      }
    }
  };

  const onSelect = event => {
    const { matches, title } = event.item.value;
    const href = nameToPath(title);

    let id;
    if (matches && matches.length > 0) {
      const { index, input } = matches[0];
      const regexp = new RegExp(/#{1,} (...+?) ?~{2}/, 'g');
      const headings = [...input.matchAll(regexp)];
      // Find nearest preceding heading to query match
      headings.forEach(heading => {
        if (heading.index < index) {
          id = `#${heading[1]
            .replace(/ ~{2}/, '')
            .replace(/ /g, '-')
            .toLowerCase()}`;
        }
      });
    }

    if (internalLink.test(href)) {
      router.push({ pathname: href, hash: id, query: value && `q=${value}` });
      onClose();
    } else {
      // external links should open in a new tab
      window.open(href);
    }
  };

  return (
    <Layer
      id="search-results"
      margin={!['xsmall', 'small'].includes(size) ? { top: 'xlarge' } : 'none'}
      onEsc={onClose}
      onClickOutside={onClose}
      position="top"
      round="medium"
    >
      <SearchResults
        allSuggestions={allSuggestions}
        onChange={onChange}
        onClose={onClose}
        onEnter={onEnter}
        onSelect={onSelect}
        query={value}
        results={suggestions}
        setSuggestions={setSuggestions}
      />
    </Layer>
  );
};

Search.propTypes = {
  setOpen: PropTypes.func,
};
