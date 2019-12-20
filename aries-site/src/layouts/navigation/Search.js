import React, {
  useContext,
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useRouter } from 'next/router';
import { Box, Keyboard, TextInput, ResponsiveContext } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';
import { structure, nameToPath } from '../../data';

const allSuggestions = structure.sections
  .map(section => (section.pages || []).concat(section.name))
  .reduce((acc, val) => acc.concat(val), [])
  .sort();

export const Search = () => {
  const router = useRouter();
  const size = useContext(ResponsiveContext);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState(allSuggestions);
  const [focused, setFocused] = useState(false);

  const boxRef = useRef();
  const inputRef = useRef();

  const applyFocusedStyle = size !== 'small' || focused;

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
  }, [focused]);

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
    console.log('enter');
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
      align="center"
      background={applyFocusedStyle ? 'background-front' : undefined}
      direction="row"
      onClick={() => setFocused(true)}
      onFocus={() => setFocused(true)}
      pad={{ right: 'small' }}
      round="small"
      width={applyFocusedStyle ? 'medium' : undefined}
    >
      {applyFocusedStyle && (
        <Keyboard onEnter={onEnter}>
          <TextInput
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
            // onSuggestionsOpen={() => setFocused(true)}
            // onSuggestionsClose={() => setFocused(false)}
            placeholder="Search HPE Design System"
            plain
            suggestions={suggestions}
            value={value}
          />
        </Keyboard>
      )}
      <Box
        pad={
          size === 'small' && !focused
            ? { vertical: 'medium', left: 'medium' }
            : undefined
        }
      >
        <SearchIcon color="text" />
      </Box>
    </Box>
  );
};
