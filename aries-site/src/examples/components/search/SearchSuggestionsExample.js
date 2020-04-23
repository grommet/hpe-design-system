import React from 'react';
import styled from 'styled-components';
import { Box, TextInput } from 'grommet';
import { Search as SearchIcon } from 'grommet-icons';

// Inputs should always be accompanied by labels for accessibility. An icon
// may serve as a label if 1) the icon meaning is well understood, and 2)
// has an 'aria-labelledby' attribute. For additional detail:
// https://www.w3.org/WAI/tutorials/forms/labels/#using-aria-labelledby
// https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/forms/Basic_form_hints
const StyledTextInput = styled(TextInput).attrs(() => ({
  'aria-labelledby': 'search-icon',
}))``;

//
const searchSuggestions = [
  'fdsafasdf',
  'fdsadfsafd',
  'fdasfsad',
  'dasfdsaf',
  'fddsadf',
  'fdsafasdf',
  'fdsadfsafd',
  'fdasfsad',
  'dasfdsaf',
  'fddsadf',
  'fdsafasdf',
  'fdsadfsafd',
  'fdasfsad',
  'dasfdsaf',
  'fddsadf',
];

export const SearchSuggestionsExample = () => {
  const [value, setValue] = React.useState();
  const [suggestions, setSuggestions] = React.useState(
    searchSuggestions.slice(0, 5),
  );

  const filterResults = query => {
    let resultSet;

    if (query) {
      const regexp = new RegExp(query, 'i');
      resultSet = searchSuggestions
        .filter(option => regexp.test(option))
        .slice(0, 5);
    } else {
      resultSet = searchSuggestions;
    }
    return resultSet;
  };

  const onChange = event => {
    const {
      target: { value: nextValue },
    } = event;
    const nextSuggestions = filterResults(nextValue);

    setValue(nextValue);
    setSuggestions(nextSuggestions);
  };

  return (
    <Box width="medium">
      <StyledTextInput
        icon={<SearchIcon id="search-icon" />}
        placeholder="Search placeholder"
        reverse
        suggestions={suggestions}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
