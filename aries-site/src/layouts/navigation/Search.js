import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Layer, ResponsiveContext } from 'grommet';
import { getSearchSuggestions, nameToPath } from '../../utils';
import { internalLink } from '../../components';
import { SearchResult, SearchResults } from '.';

const allSuggestions = getSearchSuggestions;

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
    /* Prioritize title matches over metadata matches */
    .sort((a, b) => {
      const ruleOrder = {
        Title: 0,
        Tags: 1,
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
    const { tags, title } = valueObj;
    const nextOption = {
      ...option,
      value: { ...valueObj, matchType: [], matchLocation: [] },
    };

    /* Title Match */
    if (regexp.test(title)) {
      nextOption.value.matchType.push('ExactMatch');
      nextOption.value.matchLocation.push('Title');
    }
    /* Content Match */
    // number of matches should affect weighting
    // TODO

    /* Metadata: Tag Match */
    else if (regexp.test(tags)) {
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
        router.push(nameToPath(suggestions[0].value.title));
      } else {
        const matches = allSuggestions.filter(
          c => c.label.toLowerCase() === value.toLowerCase(),
        );
        if (matches.length === 1) {
          router.push(nameToPath(matches[0].value.title));
        }
      }
    }
  };

  const onSelect = event => {
    const href = nameToPath(event.item.value.title);
    if (internalLink.test(href)) {
      router.push(href);
      onClose();
    } else {
      // external links should open in a new tab
      window.open(href);
    }
  };

  return (
    <Layer
      margin={size !== 'small' ? { top: 'medium' } : 'none'}
      onEsc={onClose}
      onClickOutside={onClose}
      position="top"
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
