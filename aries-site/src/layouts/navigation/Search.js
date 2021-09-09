import React, { useContext, useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Layer, ResponsiveContext, Keyboard } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

import { getSearchSuggestions, nameToPath } from '../../utils';
import { internalLink } from '../../components';
import { SearchInput, SearchResults } from '.';

const allSuggestions = getSearchSuggestions;

export const Search = ({ focused, setFocused }) => {
  const router = useRouter();
  const size = useContext(ResponsiveContext);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(allSuggestions);
  const inputRef = useRef();
  const searchResultsRef = useRef();

  const [searchResults, setSearchResults] = useState(false);

  useEffect(() => {
    if (focused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [focused, setFocused]);

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    let nextSuggestions;
    if (nextValue) {
      const regexp = new RegExp(nextValue, 'i');
      nextSuggestions = allSuggestions.filter(
        c => regexp.test(c.label) || regexp.test(c.value.tags),
      );
    } else {
      nextSuggestions = allSuggestions;
    }

    setSuggestions(nextSuggestions);
    setValue(nextValue);
  };

  const onEnter = () => {
    if (value) {
      if (suggestions.length === 1) {
        router.push(nameToPath(suggestions[0].label));
      } else {
        const matches = allSuggestions.filter(
          c => c.label.toLowerCase() === value.toLowerCase(),
        );
        if (matches.length === 1) {
          router.push(nameToPath(matches[0].label));
        } else {
          setSearchResults(true);
        }
      }
    }
  };

  const onSelect = event => {
    const href = nameToPath(event.suggestion.label);
    if (internalLink.test(href)) {
      router.push(href);
      setFocused(false);
    } else {
      // external links should open in a new tab
      window.open(href);
    }
  };

  const onClose = () => setSearchResults(false);

  return (
    <>
      {!focused && size === 'small' && (
        <Button icon={<SearchIcon />} onClick={() => setFocused(true)} />
      )}
      {(focused || size !== 'small') && (
        <Box background="background-contrast" round="xsmall" width="medium">
          <Keyboard onEsc={() => setFocused(false)} onEnter={onEnter}>
            <SearchInput
              ref={inputRef}
              dropHeight="small"
              placeholder="Search HPE Design System"
              onChange={onChange}
              onSuggestionSelect={onSelect}
              suggestions={suggestions}
              value={value}
              onBlur={event => {
                // Only treat it as a blur if the element receiving focus
                // isn't in our drop. The relatedTarget will be our drop
                if (!event.relatedTarget) {
                  setFocused(false);
                }
              }}
            />
          </Keyboard>
        </Box>
      )}
      {searchResults && (
        <Layer onClickOutside={onClose} onEsc={onClose}>
          <SearchResults
            ref={searchResultsRef}
            onClose={onClose}
            query={value}
            results={suggestions.map(suggestion => ({
              query: value,
              page: suggestion,
              title: suggestion.label,
              matchedText: 'blach',
              url: nameToPath(suggestion.value.name),
              preview: suggestion.value.description,
            }))}
            allSuggestions={allSuggestions}
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
