import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Layer, ResponsiveContext } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { getSearchSuggestions, nameToPath } from '../../utils';
import { internalLink } from '../../components';
import { SearchResult, SearchResults } from '.';

const allSuggestions = getSearchSuggestions;

const formatResults = (query, results) =>
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

export const Search = ({ focused, setFocused }) => {
  const router = useRouter();
  const size = useContext(ResponsiveContext);
  const [showLayer, setShowLayer] = useState(true);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(
    formatResults(null, allSuggestions),
  );

  const onClose = () => {
    setShowLayer(false);
    setFocused(false);
  };

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    let nextSuggestions;
    if (nextValue.length) {
      const regexp = new RegExp(nextValue, 'i');
      nextSuggestions = allSuggestions.filter(option => {
        const { value: valueObj } = option;
        const { tags, title } = valueObj;
        return regexp.test(title) || regexp.test(tags);
      });
    } else {
      nextSuggestions = allSuggestions;
    }

    setSuggestions(
      formatResults(nextValue.length > 0 ? nextValue : null, nextSuggestions),
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
      setFocused(false);
    } else {
      // external links should open in a new tab
      window.open(href);
    }
  };

  return (
    <>
      <Button icon={<SearchIcon />} onClick={() => setFocused(true)} />
      {((focused && showLayer) || size !== 'small') && (
        <Layer onEsc={onClose} onClickOutside={onClose} position="top">
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
      )}
    </>
  );
};

Search.propTypes = {
  focused: PropTypes.bool.isRequired,
  setFocused: PropTypes.func.isRequired,
};
