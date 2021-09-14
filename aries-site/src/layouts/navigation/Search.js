import React, { useContext, useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, ResponsiveContext, Keyboard } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { getSearchSuggestions, nameToPath } from '../../utils';
import { internalLink } from '../../components';
import { SearchInput, SearchResult } from '.';

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
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(
    formatResults(null, allSuggestions),
  );
  const inputRef = useRef();

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

    if (nextSuggestions.length === 0) {
      nextSuggestions = [{ value: { title: 'No results found.' } }];
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
    const href = nameToPath(event.suggestion.value.title);
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
      {!focused && size === 'small' && (
        <Button icon={<SearchIcon />} onClick={() => setFocused(true)} />
      )}
      {(focused || size !== 'small') && (
        <Box background="background-contrast" round="xsmall" width="medium">
          <Keyboard onEsc={() => setFocused(false)} onEnter={onEnter}>
            <SearchInput
              ref={inputRef}
              dropAlign={{ top: 'bottom', right: 'right' }}
              dropHeight="medium"
              dropProps={{}}
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
    </>
  );
};

Search.propTypes = {
  focused: PropTypes.bool.isRequired,
  setFocused: PropTypes.func.isRequired,
};
