import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Keyboard, TextInput, ResponsiveContext } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { getSearchSuggestions, nameToPath } from '../../utils';

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

  const boxRef = useRef();
  const inputRef = useRef();
  // Needed so that boxRef.current is not undefined. Allows suggestions drop
  // to match width of containing box as opposed to just width of text input
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    forceUpdate();
  }, [forceUpdate]);

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
    router.push(nameToPath(event.suggestion));
  };

  return (
    <Box
      ref={boxRef}
      data-test-id="search"
      align="center"
      background={
        size !== 'small' || focused ? 'background-contrast' : undefined
      }
      direction="row"
      justify="between"
      onClick={() => setFocused(true)}
      onFocus={() => setFocused(true)}
      pad={{ right: 'small' }}
      round="small"
      width={size !== 'small' || focused ? 'medium' : undefined}
    >
      {size !== 'small' || focused ? (
        <Keyboard onEsc={() => setFocused(false)} onEnter={onEnter}>
          <StyledTextInput
            ref={inputRef}
            dropTarget={boxRef.current}
            dropProps={{
              margin: {
                // push drop just below focus indicator of text input
                top: '3px',
              },
            }}
            dropHeight="small"
            onChange={onChange}
            onSelect={onSelect}
            placeholder="Search HPE Design System"
            plain
            suggestions={suggestions}
            value={value}
          />
        </Keyboard>
      ) : (
        undefined
      )}
      <Box
        pad={
          size === 'small' && !focused
            ? { vertical: 'medium', left: 'medium' }
            : undefined
        }
      >
        <SearchIcon id="search-icon" color="text" />
      </Box>
    </Box>
  );
};

Search.propTypes = {
  focused: PropTypes.bool.isRequired,
  setFocused: PropTypes.func.isRequired,
};
