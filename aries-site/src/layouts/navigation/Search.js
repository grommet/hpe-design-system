import React, { useContext, useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button, TextInput, ResponsiveContext, Keyboard } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { getSearchSuggestions, nameToPath } from '../../utils';
import { internalLink } from '../../components';

const allSuggestions = getSearchSuggestions;

// Using Search icon as the arialabelledby for the text input. Documentation
// on why this is a valid replacement for using label here:
// https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export const Search = ({ focused, setFocused }) => {
  const router = useRouter();
  const size = useContext(ResponsiveContext);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(allSuggestions);
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
    if (nextValue) {
      const regexp = new RegExp(nextValue, 'i');
      nextSuggestions = allSuggestions.filter(c => regexp.test(c));
    } else {
      nextSuggestions = allSuggestions;
    }
    // don't use newer value if nothing matches it
    if (nextSuggestions.length > 0) {
      setValue(nextValue);
      setSuggestions(nextSuggestions);
    }
  };

  const onEnter = () => {
    if (value) {
      if (suggestions.length === 1) {
        router.push(nameToPath(suggestions[0]));
      } else {
        const matches = allSuggestions.filter(
          c => c.toLowerCase() === value.toLowerCase(),
        );
        if (matches.length === 1) {
          router.push(nameToPath(matches[0]));
        }
      }
    }
  };

  const onSelect = event => {
    const href = nameToPath(event.suggestion);
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
            <StyledTextInput
              ref={inputRef}
              icon={<SearchIcon id="search-icon" />}
              dropHeight="small"
              placeholder="Search HPE Design System"
              onChange={onChange}
              onSuggestionSelect={onSelect}
              suggestions={suggestions}
              value={value}
              plain
              reverse
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
