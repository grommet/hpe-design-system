import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Button, ResponsiveContext, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import { useFilters } from '.';

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

export function SearchFilter({ placeholder }) {
  const size = useContext(ResponsiveContext);
  const filterContext = useFilters();
  const { applyFilters, data, filters, searchValue, setSearchValue } =
    filterContext;
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef();

  // transfer focus from search button to search text input
  useEffect(() => {
    if (searchFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchFocused, setSearchFocused]);

  return !['xsmall', 'small'].includes(size) || searchFocused ? (
    <Box width="medium" flex="shrink">
      <StyledTextInput
        ref={inputRef}
        type="search"
        icon={<Search id="search-icon" />}
        placeholder={placeholder || 'Search...'}
        onBlur={() => setSearchFocused(false)}
        value={searchValue}
        onChange={event => {
          setSearchValue(event.target.value);
          applyFilters(data, filters, event.target.value);
        }}
      />
    </Box>
  ) : (
    <Button
      id="search-button"
      kind="toolbar"
      icon={<Search />}
      onClick={() => setSearchFocused(true)}
    />
  );
}

SearchFilter.propTypes = {
  placeholder: PropTypes.string,
};
