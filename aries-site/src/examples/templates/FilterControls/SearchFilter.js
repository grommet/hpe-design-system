import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Box, Button, ResponsiveContext, TextInput } from 'grommet';
import { Search } from 'grommet-icons';
import { useFilters } from '.';

const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

const StyledButton = styled(Button)`
  border: 1px solid
    ${({ theme }) => theme.global.colors.border[theme.dark ? 'dark' : 'light']};
  &:hover {
    background: transparent;
  }
`;

export const SearchFilter = () => {
  const size = useContext(ResponsiveContext);
  const filterContext = useFilters();
  const {
    applyFilters,
    data,
    filters,
    searchValue,
    setSearchValue,
  } = filterContext;
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef();

  // transfer focus from search button to search text input
  useEffect(() => {
    if (searchFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchFocused, setSearchFocused]);

  return (
    <>
      {size !== 'small' || searchFocused ? (
        <Box width="medium">
          <StyledTextInput
            ref={inputRef}
            type="search"
            icon={<Search id="search-icon" />}
            placeholder="Search by server attributes (e.g. location, etc.)"
            onBlur={() => setSearchFocused(false)}
            value={searchValue}
            onChange={event => {
              setSearchValue(event.target.value);
              applyFilters(data, filters, event.target.value);
            }}
          />
        </Box>
      ) : (
        <StyledButton
          id="search-button"
          icon={<Search />}
          onClick={() => setSearchFocused(true)}
        />
      )}
    </>
  );
};
